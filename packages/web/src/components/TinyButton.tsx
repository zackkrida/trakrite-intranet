export const TinyButton: React.FC<JSX.IntrinsicElements['button']> = ({
  children,
  ...props
}) => (
  <button {...props}>
    <span>{children}</span>
    <style jsx>{`
      button {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #e3e3e3;
        color: #595959;
        cursor: pointer;
        display: inline-block;
        font-size: 0.8em;
        letter-spacing: -0.5px;
        line-height: 1;
        margin-left: 6px;
        padding: 4px;
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
