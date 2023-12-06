import './App.css';
import SidePicture from './components/side-picture/SidePicture';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Estoult.fr</h1>
        <h2>Un site cool</h2>
      </div>

      <div>
        <img src='https://counter.seku.su/cmoe?name=estoult' alt='Website view counter'/>
      </div>
      
      <SidePicture />
    </div>
  );
}

export default App;
