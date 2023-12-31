<<<<<<< HEAD
import './App.css';
import Router from './shared/Router';
import GlobalStyle from './styled/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />

      <Router />
    </>
=======
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
>>>>>>> 38563b20a9a2408489b195db6dcb9570e929c3a7
  );
}

export default App;
