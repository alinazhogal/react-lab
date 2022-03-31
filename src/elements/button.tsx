import "./button.scss";

interface ButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ title, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
