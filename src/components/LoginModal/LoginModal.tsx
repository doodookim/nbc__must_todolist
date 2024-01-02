import { FirebaseError } from '@firebase/util';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            setLoginError('존재하지 않는 ID입니다');
            break;
          case 'auth/wrong-password':
            setLoginError('비밀번호가 일치하지 않습니다');
            break;
          default:
            setLoginError('이메일과 비밀번호를 다시 한번 확인해주세요!');
        }
      } else {
        setLoginError('로그인 시도 중 오류가 발생했습니다');
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      ref={modalRef}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '75%',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', fontWeight: 'bold', color: '#ff70a2', fontSize: '18pt' }}>로그인</h2>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            style={{
              width: '95%',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #DD94B3',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            style={{
              width: '95%',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #DD94B3',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          />
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <button
            type="submit"
            style={{
              flex: 1,
              marginRight: '140px',
              width: '40%',
              padding: '10px',
              backgroundColor: '#DD94B3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13pt',
              marginBottom: '15px' // 첫 번째 버튼 아래 마진 추가
            }}
          >
            로그인
          </button>
          <button
            onClick={onClose}
            className="close-button"
            style={{
              flex: 1,
              width: '40%',
              padding: '10px',
              marginTop: '15px',
              backgroundColor: '#DD94B3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13pt'
            }}
          >
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
