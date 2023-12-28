import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
