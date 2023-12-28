import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
        setIsSignUpModalOpen(false);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      {user ? (
        <div>
          <p>{user.email}</p>
          <button
            onClick={async () => {
              try {
                await signOut(auth);
              } catch (error: any) {
                console.error(error);
              }
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="이름"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <button onClick={() => setIsSignUpModalOpen(true)}>회원가입</button>
          <button
            onClick={async () => {
              try {
                const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
              } catch (error: any) {
                console.error(error);
              }
            }}
          >
            로그인
          </button>
        </>
      )}

      {isSignUpModalOpen && (
        <div className="modal">
          <h2>회원가입</h2>
          <input
            type="text"
            placeholder="이름"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleSignUp}>가입하기</button>
          <button onClick={() => setIsSignUpModalOpen(false)}>닫기</button>
        </div>
      )}
    </>
  );
}

export default App;
