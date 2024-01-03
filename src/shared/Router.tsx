import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alarm from '../components/Alarm';
import RegisterModal from '../components/RegisterModal';
import Share from '../components/Share';
import Layout from '../layout/Layout';
import Main from '../pages/Main';

const Router: React.FC<RouterProps> = ({ showSignUp, setShowSignUp, showLogin, setShowLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="Share" element={<Share />} />
          <Route path="Alarm" element={<Alarm />} />
          <Route path="register" element={<RegisterModal onClose={() => {}} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

interface RouterProps {
  showSignUp: boolean;
  setShowSignUp: (show: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

export default Router;
