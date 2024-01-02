// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import LoadingModal from './components/LoadingModal/LoadingModal'; // 로딩 모달 컴포넌트 임포트
// import Main from './pages/Main';

// function App(): JSX.Element {
//   return (
//     <>
//       <LoadingModal /> {/* 로딩 모달을 Router 바깥에 추가 */}
//       <Router>
//         <Routes>
//           <Route path="/" element={<Main />} />
//           {/* 다른 라우트들이 필요하다면 여기에 추가 */}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUpModal from './components/SignupModal/SignupModal'; // 회원가입 모달 컴포넌트 import
import Main from './pages/Main';

function App(): JSX.Element {
  const [showSignUp, setShowSignUp] = useState(false); // 회원가입 모달 상태

  return (
    <>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}

      <Router>
        <Routes>
          <Route path="/" element={<Main onShowSignUp={() => setShowSignUp(true)} />} />
          {/* 다른 라우트들이 필요하다면 여기에 추가 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
