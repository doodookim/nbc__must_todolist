import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../App';
import Main from '../pages/Main';

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
