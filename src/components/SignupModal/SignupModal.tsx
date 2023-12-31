import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        // 사용자 정보 Firestore에 저장
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, { username, email });

        // 회원가입 성공 시 모달 닫기 및 메인 페이지로 이동
        onClose();
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('회원가입 실패:', error.message);
        // Firebase 오류 코드 확인 및 사용자 정의 메시지 설정
        if (error.message.includes('auth/weak-password')) {
          setErrorMessage('비밀번호는 6자리 이상이어야 합니다!');
        } else {
          // 다른 오류에 대한 기본 메시지
          setErrorMessage(error.message);
        }
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
          width: 'auto',
          maxWidth: '750px',
          minHeight: '250px',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', fontWeight: 'bold', fontSize: '18pt', color: '#ff70a2' }}>회원가입</h2>
        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디 입력"
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
            placeholder="비밀번호는 6자리 이상입니다"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 재입력"
            style={{
              width: '95%',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #DD94B3',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          />
          {errorMessage && <p style={{ color: 'red', width: '75%' }}>{errorMessage}</p>}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#DD94B3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13pt',
              fontWeight: 'bold',
              justifyContent: 'center'
            }}
          >
            회원가입
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#DD94B3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13pt',
              fontWeight: 'bold',
              justifyContent: 'center'
            }}
          >
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
