-- Instructions for creating the database
-- Run 'createdb trakrite' in the terminal

-- Create a private schema for some user details
create schema trakrite_private;

-- Add extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create our user table
create table public.user (
  id           uuid primary key default uuid_generate_v1mc(),
  first_name   text not null check (char_length(first_name) < 80),
  last_name    text check (char_length(last_name) < 80),
  job_title    text,
  is_admin     boolean default false,
  created_at   timestamp default now(),
  updated_at   timestamp default now()
);

-- A function to update an updated_at column to the current timestamp on trigger
create function trakrite_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;


-- Set the 'updated_at' column every time we modify our user
create trigger user_updated_at before update
  on public.user
  for each row
  execute procedure trakrite_private.set_updated_at();

-- User Comments
comment on table public.user is E'@omit create,delete';
comment on table public.user is 'A user of the app.';

comment on column public.user.id is 'The primary unique identifier for the user.';
comment on column public.user.first_name is 'The users first name.';
comment on column public.user.last_name is 'The users last name.';
comment on column public.user.job_title is 'A short description about the user.';
comment on column public.user.created_at is 'The time this user was created.';
comment on column public.user.created_at is 'The time this user was created.';
comment on column public.user.is_admin is 'A boolean for admin status';

-- The user account details, contained in a privately scoped schema
create table trakrite_private.user_account (
  user_id        uuid primary key references public.user(id) on delete cascade,
  email          text not null unique check (email ~* '^.+@.+\..+$'),
  password_hash  text not null
);

-- Private account comments
comment on table trakrite_private.user_account is E'@omit create,delete';
comment on table trakrite_private.user_account is 'Private information about a users account.';

comment on column trakrite_private.user_account.user_id is 'The id of the user associated with this account.';
comment on column trakrite_private.user_account.email is 'The email address of the user.';
comment on column trakrite_private.user_account.password_hash is 'An opaque hash of the userâ€™s password.';


-- Function to register a new user
create or replace function public.register_user(
  first_name text,
  last_name text,
  email text,
  job_title text,
  password text
) returns public.user as $$
declare
  person public.user;
begin
  insert into public.user (first_name, last_name, job_title) values
    (first_name, last_name, job_title)
    returning * into person;

  insert into trakrite_private.user_account (email, password_hash, user_id) values (email, crypt(password, gen_salt('bf')), person.id);

  return person;
end;
$$ language plpgsql strict security definer;

comment on function public.register_user(text, text, text, text, text) is 'Registers a single user and creates an account in our app.';

-- Setup roles
drop role if exists trakrite_postgraphile;
create role trakrite_postgraphile login password 'xyz';

drop role if exists trakrite_anonymous;
create role trakrite_anonymous;
grant trakrite_anonymous to trakrite_postgraphile;

drop role if exists trakrite_user;
create role trakrite_user;
grant trakrite_user to trakrite_postgraphile;

-- Create our token type
create type public.jwt_token as (
  role text,
  user_id uuid
);

-- Full name function
create or replace function public.user_full_name(person public.user) returns text as $$
  select person.first_name || ' ' || person.last_name
$$ language sql stable;

comment on function public.user_full_name(public.user) is 'A users full name which is a concatenation of their first and last name.';



-- Authenticate a user
create or replace function public.authenticate(
  email text,
  password text
) returns public.jwt_token as $$
declare
  account trakrite_private.user_account;
begin
  select a.* into account
  from trakrite_private.user_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('trakrite_user', account.user_id)::public.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function public.authenticate(text, text) is 'Creates a JWT token that will securely identify a user and give them certain permissions.';


-- Function to retrieve current user
create or replace function public.current_user() returns public.user as $$
  select *
  from public.user
  where id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable;

comment on function public.current_user() is 'Gets the user who was identified by our JWT.';


-- Now we set up privliges
alter default privileges revoke execute on functions from public;

grant usage on schema public to trakrite_anonymous, trakrite_user;

grant select on table public.user to trakrite_anonymous, trakrite_user;
grant update, delete on table public.user to trakrite_user;

grant execute on function public.user_full_name(public.user) to trakrite_anonymous, trakrite_user;
grant execute on function public.authenticate(text, text) to trakrite_anonymous, trakrite_user;
grant execute on function public.current_user() to trakrite_anonymous, trakrite_user;

grant execute on function public.register_user(text, text, text, text) to trakrite_anonymous;


-- Row level security for user fields
alter table public.user enable row level security;

create policy select_user on public.user for select using (true);

-- Not sure i want these yet
create policy update_user on public.user for update to trakrite_user
  using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);

-- Not sure i want these yet
create policy delete_user on public.user for delete to trakrite_user
  using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);

-- Create our mile table
create table public.mile (
  id           uuid primary key default uuid_generate_v1mc(),
  user_id      uuid references public.user(id) on delete cascade,
  info         text not null,
  distance     int not null,
  date         timestamp not null default now(),
  created_at   timestamp default now(),
  updated_at   timestamp default now()
);

-- Set the 'updated_at' column every time we modify our mile table
create trigger mile_updated_at before update
  on public.mile
  for each row
  execute procedure trakrite_private.set_updated_at();

-- Mileage table permissions
grant select on table public.mile to trakrite_anonymous, trakrite_user;
grant insert, update, delete on table public.mile to trakrite_user;


-- Create a payment type enum
CREATE TYPE pay_status AS ENUM ('PAID', 'CANCELLED', 'INVOICED', 'WAITING', 'PENDING');

-- Create our job table
create table public.job (
  id              uuid primary key default uuid_generate_v1mc(),
  user_id         uuid references public.user(id) on delete set null,
  payment_status  pay_status not null default 'PENDING',
  name            text,
  customer_name   text,
  notes           text,
  progress        text,
  recieved_on     timestamp not null default now(),
  created_at      timestamp default now(),
  updated_at      timestamp default now()
);

-- Set the 'updated_at' column every time we modify our job table
create trigger job_updated_at before update
  on public.job
  for each row
  execute procedure trakrite_private.set_updated_at();

-- Job table permissions
grant select on table public.job to trakrite_anonymous, trakrite_user;
grant insert, update, delete on table public.job to trakrite_user;


-- Update User Password function
create or replace function public.update_password(password text) returns trakrite_private.user_account as $$
  update trakrite_private.user_account set password_hash = crypt($1, gen_salt('bf')) where user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid returning *
$$ language sql volatile;

grant execute on function public.update_password(text) to trakrite_user;
