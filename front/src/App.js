import './App.css';
import SidePicture from './components/side-picture/SidePicture';
import PictureLoader from './components/picture-loader/PictureLoader';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Estoult.fr</h1>
        <h2>Un site cool</h2>
      </div>

      <div>
        <PictureLoader 
          url={'https://counter.seku.su/cmoe?name=estoult'}
          alt={'Website view counter'}
          width={225}
          height={100}
        />
      </div>
      
      <SidePicture/>
    </div>
  );
}

export default App;
