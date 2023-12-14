import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import Home from './components/home/Home';
import Page404 from './components/page404/Page404';
import Chat from './components/chat/Chat';
import { startChatSocket, stopChatSocket } from './components/chat/chatClient';

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
  const locationEffects = [
    { path: '/', title: 'Estoult - Home', effect: [stopChatSocket] },
    { path: '/chat', title: 'Estoult - Chat', effect: [startChatSocket] },
  ]
  const location404Effect = { title: 'Estoult - Page Not Found', effects: [stopChatSocket] };

  useEffect(() => {
    const location = locationEffects.find(location => location.path === location.pathname);
    if(location !== undefined) {
      document.title = location.title;
      location.effects.forEach(effect => effect());
    }

    switch (location.pathname) {
      case '/':
        document.title = '';
        break;
      case '/chat':
        document.title = '';
        break;
      default:
        document.title = 'Estoult - ';
    }
  }, [location.pathname]);

  return null;
}

export default App;