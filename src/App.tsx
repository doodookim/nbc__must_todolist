import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingModal from './components/LoadingModal/LoadingModal'; // 로딩 모달 컴포넌트 임포트
import Main from './pages/Main';

function App(): JSX.Element {
  return (
    <>
      <LoadingModal /> {/* 로딩 모달을 Router 바깥에 추가 */}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 다른 라우트들이 필요하다면 여기에 추가 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
