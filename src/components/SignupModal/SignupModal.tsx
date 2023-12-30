import 'firebase/auth';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다!');
      return;
    }
    setErrorMessage('');

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('회원가입 성공:', userCredential.user);
      setIsSignUpSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error('회원가입 실패:', error.message);
        setErrorMessage(error.message);
      }
    }
  };

  if (isSignUpSuccess) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>회원가입 성공!</p>
          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
          >
            홈페이지로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSignUp}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 재입력"
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
