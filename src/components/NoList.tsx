import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
function NoList() {
  const navigate = useNavigate();
  const onClickEvent = () => {
    navigate('/register');
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
