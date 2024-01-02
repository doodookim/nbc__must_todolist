// Router.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
        <Route
          path="/"
          element={
            <Main
              showSignUp={showSignUp}
              setShowSignUp={setShowSignUp}
              showLogin={showLogin}
              setShowLogin={setShowLogin}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
