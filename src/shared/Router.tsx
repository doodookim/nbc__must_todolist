import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alarm from '../components/Alarm';
import Share from '../components/Share';
import Layout from '../layout/Layout';
import Login from '../pages/Login';
import Main from '../pages/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="Login" element={<Login />} />
          <Route path="Share" element={<Share />} />
          <Route path="Alarm" element={<Alarm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
