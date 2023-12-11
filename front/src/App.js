import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/home/Home';
import Page404 from './components/page404/Page404';
import Chat from './components/chat/Chat';

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/chat' element={<Chat/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
