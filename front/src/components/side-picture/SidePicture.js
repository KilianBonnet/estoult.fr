import './SidePicture.css';

function SidePicture() {
  const sidePictures = ["flandre", "marisa", "reimu"];
  const currentPictureIndex = Math.floor(Math.random() * (sidePictures.length - 0)) + 0;
  const currentPicture = require(`./images/${sidePictures[currentPictureIndex]}.png`);

  return (
    <div className="SidePicture">
        <img className='side-picture-container' src={currentPicture} alt={"Character " + sidePictures[currentPictureIndex]} />
    </div>
  );
}

export default SidePicture;