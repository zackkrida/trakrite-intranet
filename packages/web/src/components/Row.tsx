export const Row = ({
  children,
  expandItems = false,
}: {
  children: React.ReactNode
  expandItems?: boolean
}) => (
  <div className="row">
    {children}
    <style jsx global>{`
      .row {
        display: flex;
        align-content: ${expandItems ? 'stretch' : 'start'};
      }

      .row.row > * {
        margin: 0 4px;
      }

      @supports (column-gap: 8px) {
        .row {
          margin: 0;
          column-gap: 8px;
        }

        .row > * {
          margin: 0;
        }
      }

      .row > * {
        flex: ${expandItems ? '1' : 'initial'};
      }
    `}</style>
  </div>
)
