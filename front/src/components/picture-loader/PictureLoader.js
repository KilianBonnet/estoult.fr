import React, { useState } from 'react';
import './PictureLoader.css'

function PictureLoader({url, alt, width, height}) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="ViewCounter">
            {!imageLoaded &&
            <div
                className="image-skeleton"
                style={{ width: `${width}px`, height: `${height}px` }}>
            </div>}
            
            <img
                src={url}
                alt={alt}
                onLoad={handleImageLoad}
            />
        </div>
    );
}

export default PictureLoader;
