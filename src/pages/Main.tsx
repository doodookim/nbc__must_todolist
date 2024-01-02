// Main.tsx
import React from 'react';
import LoginModal from '../components/LoginModal/LoginModal';
import SignUpModal from '../components/SignupModal/SignupModal';

interface MainProps {
  showSignUp: boolean;
  setShowSignUp: (show: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const Main: React.FC<MainProps> = ({ showSignUp, setShowSignUp, showLogin, setShowLogin }) => {
  return (
    <div>
      <button onClick={() => setShowSignUp(true)}>회원가입</button>
      <button onClick={() => setShowLogin(true)}>로그인</button>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {/* Main 페이지의 다른 컨텐츠 */}
    </div>
  );
};

export default Main;
