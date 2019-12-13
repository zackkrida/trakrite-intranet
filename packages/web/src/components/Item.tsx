import { Row } from './Row'

export const Item = ({
  title,
  subtitle,
  right,
  actions,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  right: React.ReactNode
  actions?: React.ReactNode
}) => (
  <article
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e3e3e3',
      paddingBottom: '12px',
      paddingTop: '12px',
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
              fontSize: '14px',
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
      }}
    >
      <div style={{ marginRight: '12px' }}>{right}</div>
      {actions && <Row justify="END">{actions}</Row>}
    </footer>
  </article>
)
