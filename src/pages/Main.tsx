// Main.tsx
import React from 'react';

interface MainProps {
  onShowSignUp: () => void;
}

const Main: React.FC<MainProps> = ({ onShowSignUp }) => {
  return (
    <div>
      <button onClick={onShowSignUp}>회원가입</button>
      {/* Main 페이지의 다른 컨텐츠 */}
    </div>
  );
};

export default Main;
