import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alram from '../components/Alram';
import Share from '../components/Share';
import Login from '../pages/Login';
import Main from '../pages/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
        <Route path="Share" element={<Share />} />
        <Route path="Alram" element={<Alram />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
