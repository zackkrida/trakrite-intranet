export const CardSet = ({ children }: { children: React.ReactNode }) => (
  <div className="cardSet">
    {children}
    <style jsx>{`
      .cardSet {
        display: grid;
        grid-template-columns: repeat(auto-fill, 1fr);
        grid-gap: 1em;
      }

      @media screen and (min-width: 340px) {
        .cardSet {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          grid-gap: 1em;
        }
      }
    `}</style>{' '}
  </div>
)
