export const Row = ({
  children,
  expandItems = false,
  justify = 'START',
}: {
  children: React.ReactNode
  expandItems?: boolean
  justify?: 'START' | 'END' | 'MIDDLE'
}) => (
  <div className="row">
    {children}
    <style jsx global>{`
      .row {
        display: flex;
        flex-wrap: wrap;
        align-content: ${expandItems ? 'stretch' : 'start'};
        justify-content: ${getDirection(justify)};
      }

      .row.row > * {
        margin: 0 4px;
        margin-bottom: 8px;
      }

      .row.row > *:first-child {
        margin-left: 0;
      }

       {
        /* Until chrome supports column-gap for flex layout */
      }
      .row > *:not(:last-child) {
        margin-right: 8px;
      }

      .row > * {
        flex: ${expandItems ? '1' : 'initial'};
      }
    `}</style>
  </div>
)

function getDirection(dir: 'START' | 'END' | 'MIDDLE') {
  if (dir === 'START') return 'flex-start'
  if (dir === 'END') return 'flex-end'
  if (dir === 'MIDDLE') return 'center'
}
