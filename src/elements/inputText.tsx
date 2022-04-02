interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string | undefined;
  errorMessage: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputText({ id, label, type, value, errorMessage, onChange }: InputProps) {
  return (
    <div className="input-div">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} name={id} onChange={onChange} required />
      <span>{errorMessage}</span>
    </div>
  );
}

export default InputText;
