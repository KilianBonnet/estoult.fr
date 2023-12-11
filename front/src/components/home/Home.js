import PictureLoader from "../picture-loader/PictureLoader";
import SidePicture from "../side-picture/SidePicture";
import './Home.css';

function Home() {
  return (
    <div className="Home">
      {document.title = "Estoult - Home"}
      <div>
        <h1>Estoult.fr</h1>
        <h2>Funky Funky</h2>
      </div>

      <div>
        <PictureLoader
          url={'https://counter.seku.su/cmoe?name=estoult'}
          alt={'Website view counter'}
          width={270}
          height={100}
        />
      </div>
      
      <SidePicture/>
    </div>
  );
}

export default Home;
