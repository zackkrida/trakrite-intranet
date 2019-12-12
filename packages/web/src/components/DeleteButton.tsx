export const DeleteButton: React.FC<JSX.IntrinsicElements['button']> = props => (
  <button {...props} className="delete">
    <span>+</span>
    <style jsx>{`
      .delete {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        border: 1px solid #fff;
        margin-left: 6px;
        font-size: 16px;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
        display: inline-block;
        border-radius: 4px;
      }

      .delete > span {
        display: block;
        transform: rotate(45deg);
        transform-origin: center;
      }

      .delete:hover,
      .delete:focus {
        border: 1px solid #e3e3e3;
        outline: 0;
      }
    `}</style>
  </button>
)
