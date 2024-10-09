// src/components/ImageList.js
import React, { useEffect, useState } from 'react';
import { getImages } from '../services/api';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getImages();
        setImages(res.data);
      } catch (err) {
        console.error('Failed to fetch images');
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h3>Your Images</h3>
      {images.length === 0 ? (
        <p>No images uploaded.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((img) => (
            <div key={img.id} style={{ margin: '10px' }}>
              <img
                src={`data:${img.mimetype};base64,${img.data}`}
                alt={img.filename}
                width="200"
              />
              <p>{img.filename}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageList;
