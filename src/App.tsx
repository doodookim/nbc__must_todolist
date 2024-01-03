import { useState } from 'react';
// import './App.css';
import Router from './shared/Router';
import GlobalStyle from './styled/GlobalStyle';

function App(): JSX.Element {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  <GlobalStyle />;
  return (
    <Router showSignUp={showSignUp} setShowSignUp={setShowSignUp} showLogin={showLogin} setShowLogin={setShowLogin} />
  );
}
export default App;
