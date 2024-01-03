import { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import RegisterModal from './RegisterModal';
function NoList() {
  const [modal, setModal] = useState(false);

  const onClickEvent = () => {
    setModal(true);
  };

  return (
    <>
      <StNolist>
        <h1>
          오늘은 등록된 할일이 없네요.
          <br />
          <br />
          해야 할 일을 작성해 볼까요?
        </h1>
        <Button text="등록" onClick={onClickEvent} />
      </StNolist>
      {modal && (
        <RegisterModal
          onClose={() => {
            setModal(false);
          }}
        />
      )}
    </>
  );
}

export default NoList;

const StNolist = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-left: 50px;
  padding-bottom: 100px;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;
