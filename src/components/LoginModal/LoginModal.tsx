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
    // 클릭 이벤트 핸들러: 모달 외부 클릭 시 모달 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const auth = getAuth();

    try {
      // Firebase를 사용한 로그인 시도
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 시 모달 닫고 메인 페이지로 이동
      onClose();
      navigate('/');
    } catch (error) {
      // 로그인 실패 시 에러 메시지 설정
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
          margin: '0',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', fontWeight: 'bold', color: '#ff70a2', fontSize: '18pt' }}>로그인</h2>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          {/* 이메일 입력 필드 */}
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
          {/* 비밀번호 입력 필드 */}
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
          {/* 로그인 에러 메시지 표시 */}
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          {/* 로그인 및 닫기 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#DD94B3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13pt',
                marginRight: '10px'
              }}
            >
              로그인
            </button>
            <button
              onClick={onClose}
              className="close-button"
              style={{
                padding: '10px',
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
