export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card">
    {children}
    <style jsx>{`
      .card {
        min-width: 400px;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: 'tnum';
        position: relative;
        background: #fff;
        border-radius: 2px;
        transition: all 0.3s;
        padding: 20px 24px 16px;
      }
    `}</style>
  </div>
)
