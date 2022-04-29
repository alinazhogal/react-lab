/* eslint-disable react/require-default-props */
interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string | undefined;
  errorMessage?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({ id, label, type, value, errorMessage, onChange, onBlur, onFocus }: InputProps) {
  return (
    <div className="input-div">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        name={id}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        required
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default Input;
