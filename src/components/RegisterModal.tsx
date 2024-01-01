import { useState } from 'react';
import styled from 'styled-components';
import closebutton from '../assets/closebutton.png';
import plusbutton from '../assets/plusbutton.png';
import { Modal } from '../types/global';
import Button from './Button';

function RegisterModal({ onClose }: Modal) {
  const [showInput, setShowInput] = useState(false);

  const registerHandler = () => {};

  return (
    <StAddListModal>
      <div className="modal-content">
        <div className="space-between">
          <span>할 일 등록하기</span>
          <img className="close" src={closebutton} alt="closebutton" onClick={onClose} />
        </div>
        {!showInput ? (
          <div className="plus" onClick={() => setShowInput(true)}>
            <img src={plusbutton} alt="plusbutton" />
          </div>
        ) : (
          <div>
            <textarea placeholder="할 일을 적어주세요!" />
            <div className="underline-container">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="underline" />
              ))}
            </div>
            <Button text="등록" onClick={registerHandler} />
          </div>
        )}
      </div>
    </StAddListModal>
  );
}

export default RegisterModal;

const StAddListModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.521);
  z-index: 10000;

  .modal-content {
    width: 600px;
    max-height: 600px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: auto;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .close {
    width: 30px;
    cursor: pointer;
  }
  span {
    font-size: 1.5em;
    margin-bottom: 10px;
    display: block;
  }
  .plus {
    display: flex;
    height: 220px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    cursor: pointer;
  }
  img {
    width: 60px;
  }

  textarea {
    width: calc(100% - 20px);
    height: 150px;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    resize: none;
    font-size: 1em;
  }

  .underline-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .underline {
    width: 20%;
    height: 1px;
    background-color: #ccc;
  }
`;
