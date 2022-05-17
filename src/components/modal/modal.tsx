import ReactDom from "react-dom";
import { useEffect } from "react";
import styles from "./modal.module.scss";
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
    if (isOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [isOpen]);

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} role="presentation" aria-label="overlay" aria-hidden="true" />
      <div className={styles.modal} role="dialog">
        <div className={styles.title}>
          <h3>{title}</h3>
          <button type="button" onClick={onClose} className={styles.close}>
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
