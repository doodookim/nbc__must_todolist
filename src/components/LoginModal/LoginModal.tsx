import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase 모듈식 가져오기
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

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

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const auth = getAuth(); // Firebase Auth 인스턴스 가져오기

    try {
      await signInWithEmailAndPassword(auth, email, password); // signInWithEmailAndPassword 사용
      // 로그인 성공 처리 (예: 페이지 이동)
      navigate('/dashboard'); // 성공 시 이동할 경로 예시
    } catch (error) {
      if (error instanceof Error) {
        // 오류 타입 확인 및 처리
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            setLoginError('존재하지 않는 ID입니다');
            break;
          case 'auth/wrong-password':
            setLoginError('비밀번호가 일치하지 않습니다');
            break;
          default:
            setLoginError('로그인에 실패했습니다');
        }
      } else {
        setLoginError('로그인 시도 중 오류가 발생했습니다');
      }
    }
  };

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
          {loginError && <p>{loginError}</p>}
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
