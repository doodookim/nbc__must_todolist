import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
const Header = () => {
  const navigate = useNavigate();
  const HandleLogoClick = () => {
    navigate('/');
  };
  return (
    <StHeader>
      <div onClick={HandleLogoClick}>
        <img src={logo} alt="logo" />
        <span>자기, 내가 부탁한 건 다 했어?</span>
      </div>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffdce9;
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  span {
    color: #dd94b3;
    font-size: 40px;
    font-variation-settings: 'wght' 900;
    border: none;
    user-select: none;
    margin-left: 14px;
  }
  img {
    height: 70px;
  }
`;
