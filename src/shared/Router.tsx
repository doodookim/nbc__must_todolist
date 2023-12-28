import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../App';
import Main from '../pages/Main';
// 이거 지워 주세요

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
