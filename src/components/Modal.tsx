import { ReactNode } from 'react';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
