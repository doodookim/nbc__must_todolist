import { useState } from 'react';
import { MdAdd, MdDelete, MdDone } from 'react-icons/md';
import styled from 'styled-components';
import closebutton from '../assets/closebutton.png';
import { Modal } from '../types/global';

function RegisterModal({ onClose }: Modal) {
  const [showInput, setShowInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const onToggleCreate = () => setOpen(!open);
  const onToggleFinish = () => setDone(!done);

  const registerHandler = () => {};

  return (
    <StAddListModal>
      <StAddModal>
        <StModalHead>
          <div className="top-list">
            <span>할 일 등록하기</span>
            <img className="close" src={closebutton} alt="closebutton" onClick={onClose} />
          </div>
          <div className="middle-list">
            <h1>2024년 1월 2일</h1>
            <div className="day">화요일</div>
            <div className="remain-task">남은 할 일 : 2개</div>
          </div>
        </StModalHead>

        <StModalContent>
          <StTodoItem>
            <StFinishTodo onClick={onToggleFinish} done={done}>
              {done && <MdDone />}
            </StFinishTodo>
            <StTodoText></StTodoText>
            <StRemoveTodo done={done}>
              <MdDelete />
            </StRemoveTodo>
          </StTodoItem>
        </StModalContent>
        {open && (
          <StFormContainer>
            <StForm>
              <StInput autoFocus placeholder="할 일 입력 후 Enter 버튼을 누르세요." />
            </StForm>
          </StFormContainer>
        )}
        <StCreateButton onClick={onToggleCreate} open={open}>
          <MdAdd />
        </StCreateButton>
      </StAddModal>
    </StAddListModal>
  );
}
{
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

  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .close {
    width: 30px;
    cursor: pointer;
  }

  .plus {
    display: flex;
    /* height: 220px; */
    align-items: center;
    justify-content: center;

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

const StAddModal = styled.div`
  width: 512px;
  height: 640px;
  max-height: 1000px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const StModalHead = styled.div`
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid #adb0b2;
  .top-list {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 1.4rem;
    color: #040404;
  }
  .middle-list {
    margin-top: 40px;
    text-align: center;
  }
  h1 {
    margin: 0;
    font-size: 30px;
    color: #262d34;
  }
  .day {
    margin-top: 20px;
    margin-left: 15px;
    color: #868e96;
    font-size: 21px;
  }
  .remain-task {
    color: #dd94b3;
    font-size: 18px;
    margin-top: 40px;
    margin-left: 15px;
    font-weight: bold;
  }
`;
const StModalContent = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const StRemoveTodo = styled.div<{ done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  :hover {
    color: #ff6b6b;
  }
  display: none;
`;
const StTodoItem = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${StRemoveTodo} {
      display: initial;
    }
  }
`;

const StFinishTodo = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  ${(props) =>
    props.done &&
    `
      border: 2px solid #DD94B3;
      color: #DD94B3;
    `}
`;
const StTodoText = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
`;
const StCreateButton = styled.button<{ open: boolean }>`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 150px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    `
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const StFormContainer = styled.form`
  width: 100%;
  display: flex;
  /* position: absolute; */
`;

const StForm = styled.form`
  background: #ffdce9;
  width: 500px;
  margin-right: 10px;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;
const StInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
