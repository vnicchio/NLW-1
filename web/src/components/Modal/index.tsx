import React, { useState, useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';

import ReactModal from 'react-modal';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'transparent',
          color: '#F0F0F5',
          borderRadius: '8px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
          zIndex: 1000
        },
      }}
    >
      <div id="modal" onClick={setIsOpen}>
        <FiCheckCircle />
        <h1 id="modal-text">Cadastro concluído!</h1>
      </div>
    </ReactModal>
  );
};

export default Modal;
