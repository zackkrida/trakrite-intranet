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
        flex-wrap: wrap;
        align-content: ${expandItems ? 'stretch' : 'start'};
      }

      .row.row > * {
        margin: 0 4px;
        margin-bottom: 8px;
      }

      @supports (column-gap: 8px) {
        .row {
          margin: 0;
          column-gap: 16px;
          grid-row-gap: 16px;
        }

        .row.row > * {
          margin: 0;
          margin-bottom: 0;
        }
      }

      .row > * {
        flex: ${expandItems ? '1' : 'initial'};
      }
    `}</style>
  </div>
)
