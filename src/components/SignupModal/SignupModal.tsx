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
        await setDoc(userRef, { username, email });

        console.log('회원가입 성공:', user);
        setIsSignUpSuccess(true);
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
          backgroundColor: '#FFDCE9',
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
            style={{ width: '95%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            style={{ width: '95%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            style={{ width: '95%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 재입력"
            style={{ width: '95%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          {errorMessage && <p style={{ color: 'red', width: '75%' }}>{errorMessage}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#e2f2ff',
              color: 'black',
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
              backgroundColor: '#fff7fa',
              color: 'black',
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
