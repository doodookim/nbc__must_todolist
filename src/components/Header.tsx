import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import LoginModal from '../components/LoginModal/LoginModal';
import SignUpModal from '../components/SignupModal/SignupModal';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Firebase Authentication 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [auth]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <StHeader>
      <div onClick={handleLogoClick}>
        <img src={logo} alt="logo" />
        <span>자기, 내가 부탁한 건 다 했어?</span>
      </div>
      <ButtonContainer>
        {isLoggedIn ? (
          <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
        ) : (
          <>
            <StyledButton onClick={openLoginModal}>로그인</StyledButton>
            <StyledButton onClick={openSignUpModal}>회원가입</StyledButton>
          </>
        )}
      </ButtonContainer>

      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      {showSignUpModal && <SignUpModal onClose={closeSignUpModal} />}
    </StHeader>
  );
};

export default Header;

// styled-components로 정의된 StHeader, ButtonContainer, StyledButton 스타일

const StHeader = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
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
    font-family: inherit;
    border: none;
    user-select: none;
    margin-left: 14px;
  }
  img {
    height: 70px;
  }
  button {
    margin-left: 10px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 15px;, 
  font-size: 16px; ,
  background-color: #ffdce9; 
  color: #dd94b3; 
  border: 1px solid #dd94b3; 
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #dd94b3; 
    color: white;
  }
`;
