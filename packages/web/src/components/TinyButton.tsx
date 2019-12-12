export const TinyButton: React.FC<JSX.IntrinsicElements['button']> = ({
  children,
  ...props
}) => (
  <button {...props}>
    <span>{children}</span>
    <style jsx>{`
      button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        margin-left: 6px;
        font-size: 12px;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #e3e3e3;
        letter-spacing: -0.5px;
        color: #595959;
      }

      button > span {
        display: block;
      }

      button:hover,
      button:focus {
        color: #40a9ff;
        background-color: #fff;
        border-color: #40a9ff;
        outline: 0;
      }

      button:active {
        color: #096dd9;
        border-color: #096dd9;
      }
    `}</style>
  </button>
)
