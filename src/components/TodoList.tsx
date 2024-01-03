import { useState } from 'react';
import { Todo } from '../types/global';
// import ModifyModal from './ModifyModal'

type UpdateType = {
  update: (data: Todo) => void;
};

const Check = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.75 41L45.25 66L77.25 34" stroke="black" stroke-width="4" />
    </svg>
  );
};
function TodoList({ id, title, complete, update }: Todo & UpdateType) {
  const [chk, setChk] = useState(false);
  const [option, setOption] = useState(false);
  const [modal, setModal] = useState(false);

  const onClickEvent = () => {
    setChk((prev) => !prev);
  };

  const showOption = () => {
    setOption((prev) => !prev);
  };

  function Options() {
    return (
      <div className="option">
        <div
          onClick={() => {
            setModal(true);
          }}
        >
          수정
        </div>
        <div>삭제</div>
      </div>
    );
  }

  return (
    <>
      <div className="todo">
        <div className="checkbox">
          <div
            className="check"
            onClick={() => {
              onClickEvent();
            }}
          >
            {chk ? <Check /> : ''}
          </div>
          <span className={chk ? 'overline' : ''}>{title}</span>
        </div>
        <div
          onClick={() => {
            showOption();
          }}
        >
          <svg width="22" height="22" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="60" r="10.5" fill="black" />
            <circle cx="60" cy="60" r="10.5" fill="black" />
            <circle cx="98" cy="60" r="10.5" fill="black" />
          </svg>
          {option ? <Options /> : null}
        </div>
      </div>
      {/* {modal && (
        <ModifyModal
          onClose={() => {
            setModal(false);
          }}
        />
      )} */}
    </>
  );
}

export default TodoList;
