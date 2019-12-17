export const Button: React.FC<ButtonProps> = ({
  theme = 'NEUTRAL',
  type = 'button',
  children,
  ...props
}) => (
  <button {...props} type={type} className={theme}>
    {children}
    <style jsx>{`
      button {
        user-select: none;
        background-image: none;
        border-radius: 4px;
        border: 1px solid;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        height: 32px;
        line-height: 1.5;
        padding: 0 15px;
        position: relative;
        text-align: center;
        touch-action: manipulation;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;
        white-space: nowrap;
      }

      button:disabled {
        color: rgba(0, 0, 0, 0.25) !important;
        background-color: #f5f5f5 !important;
        border-color: #d9d9d9 !important;
        text-shadow: none !important;
        box-shadow: none !important;
        cursor: not-allowed !important;
      }

      /* Theming time! */
      .NEUTRAL {
        background-color: #fff;
        border-color: rgb(217, 217, 217);
      }

      .NEUTRAL:hover,
      .NEUTRAL:focus {
        color: #40a9ff;
        background-color: #fff;
        border-color: #40a9ff;
        outline: 0;
      }

      .NEUTRAL:active {
        color: #096dd9;
        border-color: #096dd9;
      }

      .PRIMARY {
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      }

      .PRIMARY:focus,
      .PRIMARY:hover {
        color: #fff;
        background-color: #40a9ff;
        border-color: #40a9ff;
      }

      .PRIMARY:active {
        color: #fff;
        background-color: #096dd9;
        border-color: #096dd9;
        outline: 0;
      }
    `}</style>
  </button>
)

type ButtonProps = JSX.IntrinsicElements['button'] & {
  theme?: 'PRIMARY' | 'NEUTRAL'
}
