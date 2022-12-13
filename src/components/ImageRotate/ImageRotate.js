import React from 'react';
import ReactPanZoom from 'react-image-pan-zoom-rotate';

const ImageRotate = ({ src }) => {
    return (
        <div
            style={{
                width: '100%',
                height: 540,
                position: "relative",
                overflow: "hidden",
                padding: '1px',
                margin: '0 auto'
            }}
        >
            <ReactPanZoom style={{ left: '20px' }}
                image={src}
                alt="image"
            />
        </div>
    );
};

export default ImageRotate;