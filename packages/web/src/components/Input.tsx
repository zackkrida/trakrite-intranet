export const Input: React.FC<InputProps> = ({ label, ...rest }) => (
  <label>
    <span className="label">{label}</span>
    <input {...rest} />
    <style jsx>{`
      label,
      .label {
        display: block;
      }

      .label {
        margin-bottom: 6px;
      }

      input {
        font-size: 14px;
        appearance: none;
        padding: 10px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #e3e3e3;
      }

      @media screen and max-width(900px) {
        input {
          font-size: 16px;
        }
      }

      input:hover {
        border-color: #40a9ff;
      }

      input:focus,
      input:active {
        border-color: #40a9ff;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
    `}</style>
  </label>
)

type InputProps = JSX.IntrinsicElements['input'] & {
  label: string
}
