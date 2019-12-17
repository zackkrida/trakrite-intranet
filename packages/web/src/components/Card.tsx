export const Card = ({
  children,
  topRight,
}: {
  children: React.ReactNode
  topRight?: React.ReactNode
}) => (
  <div className="card">
    {topRight && <div className="top-right">{topRight}</div>}
    {children}
    <style jsx>{`
      .card {
        position: relative;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: 'tnum';
        position: relative;
        background: #fff;
        border-radius: 2px;
        transition: all 0.3s;
        padding: 20px 24px 16px;
        line-height: 1.5;
      }

      .top-right {
        position: absolute;
        top: 20px;
        right: 16px;
      }

      @media screen and (max-width: 1000px) {
        .card {
          line-height: 1.3;
        }
      }
    `}</style>
  </div>
)
