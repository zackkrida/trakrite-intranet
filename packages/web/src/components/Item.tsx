import { Row } from './Row'

export const Item = ({
  title,
  subtitle,
  right,
  actions,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  right?: React.ReactNode
  actions?: React.ReactNode
}) => (
  <article
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e3e3e3',
      padding: '1.2em 0',
    }}
  >
    <header>
      <h3>
        {title}
        {subtitle && (
          <span
            style={{
              display: 'block',
              fontWeight: 'normal',
              fontSize: '.9em',
              color: 'rgba(0,0,0,0.65)',
            }}
          >
            {subtitle}
          </span>
        )}
      </h3>
    </header>
    <footer
      style={{
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        fontSize: '.9em',
      }}
    >
      {right && <div>{right}</div>}
      {actions && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: '1em',
          }}
        >
          {actions}
        </div>
      )}
    </footer>
  </article>
)
