import "./button.scss";

interface ButtonProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ title, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className="button-el">
      {title}
    </button>
  );
}

export default Button;
