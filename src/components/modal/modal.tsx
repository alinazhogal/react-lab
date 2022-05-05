import ReactDom from "react-dom";
import "./modal.scss";
import { useEffect } from "react";
import close from "../../assets/images/close.svg";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const portal = document.getElementById("portal") as HTMLElement;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [isOpen]);

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} role="presentation" aria-label="overlay" aria-hidden="true" />
      <div className="modal" role="dialog">
        <div className="modal-title">
          <h3>{title}</h3>
          <button type="button" onClick={onClose} className="close">
            <img src={close} alt="close modal" />
          </button>
        </div>
        {children}
      </div>
    </>,
    portal
  );
}

export default Modal;
