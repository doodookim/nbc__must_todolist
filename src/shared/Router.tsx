// Router.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alarm from '../components/Alarm';
import Share from '../components/Share';
import Layout from '../layout/Layout';
import Main from '../pages/Main';

interface RouterProps {
  showSignUp: boolean;
  setShowSignUp: (show: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const Router: React.FC<RouterProps> = ({ showSignUp, setShowSignUp, showLogin, setShowLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="Share" element={<Share />} />
          <Route path="Alarm" element={<Alarm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
