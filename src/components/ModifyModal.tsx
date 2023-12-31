import React from "react";
import ModalBg from "./ModalBg";
import Button from "./Button";
import { Modal } from "../types/global";

function ModifyModal({ onClose }: Modal) {
  const registerHandler = () => {};

  return (
    <ModalBg>
      <div className="modal-inner register">
        <div className="flex justify-between">
          <span>수정하기</span>
          <div onClick={onClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 89 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 10L79 78.5M79 10L10.5 78.5"
                stroke="black"
                stroke-width="3"
              />
            </svg>
          </div>
        </div>
        <div>
          <input type="text" placeholder="할 일을 적어주세요" />
        </div>
        <div>
          <Button text="등록" onClick={registerHandler} />
        </div>
      </div>
    </ModalBg>
  );
}

export default ModifyModal;
