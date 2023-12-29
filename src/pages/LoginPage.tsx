import { useState } from 'react';
import Login from '../components/Login';
import Modal from '../components/Modal';
import SignUp from '../components/SignUp';

const LoginPage = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={() => setIsSignUpModalOpen(true)}>회원가입</button>
      {isSignUpModalOpen && (
        <Modal onClose={() => setIsSignUpModalOpen(false)}>
          <SignUp />
        </Modal>
      )}
      <Login />
    </div>
  );
};

export default LoginPage;
