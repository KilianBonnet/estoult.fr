import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import Home from './components/home/Home';
import Page404 from './components/page404/Page404';
import Chat from './components/chat/Chat';

function App() {
  return (
  <div className="App">
    <Router>
      <Layout />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/chat' element={<Chat/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </Router>
  </div>
  );
}

function Layout() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Estoult - Home';
        break;
      case '/chat':
        document.title = 'Estoult - Chat';
        break;
      default:
        document.title = 'Estoult - Page Not Found';
    }
  }, [location.pathname]);

  return null;
}

export default App;