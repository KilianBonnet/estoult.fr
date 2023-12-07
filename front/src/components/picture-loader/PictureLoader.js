import React, { useState } from 'react';
import './PictureLoader.css'

function PictureLoader({url, alt, width, height}) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="PictureLoader" style={{ height: `${height}px` }}>
            {!imageLoaded &&
            <div
                className="image-skeleton"
                style={{ width: `${width}px`, height: `${height}px` }}>
            </div>}
            
            <img
                width={imageLoaded ? "" : "0px" }
                height={imageLoaded ? "" : "0px"}

                src={url}
                alt={alt}
                onLoad={handleImageLoad}
            />
        </div>
    );
}

export default PictureLoader;
