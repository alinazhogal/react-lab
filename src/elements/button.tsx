import "./button.scss";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
