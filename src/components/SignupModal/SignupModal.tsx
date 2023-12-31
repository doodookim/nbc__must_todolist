import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState<string>(''); // 사용자 아이디
  const [email, setEmail] = useState<string>(''); // 이메일
  const [password, setPassword] = useState<string>(''); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 비밀번호 확인
  const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false); // 회원가입 성공 여부

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
    const auth = getAuth();
    const firestore = getFirestore();

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다!');
      return;
    }

    setErrorMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, {
          username, // 아이디 저장
          email
        });

        console.log('회원가입 성공:', user);
        setIsSignUpSuccess(true);
        // 추가적인 성공 처리 (예: 로그인 페이지로 이동)
      }
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
              navigate('/'); // 홈페이지 또는 다른 페이지로 이동
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="아이디 입력" />
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
