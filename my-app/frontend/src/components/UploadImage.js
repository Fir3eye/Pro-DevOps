// src/components/UploadImage.js
import React, { useState } from 'react';
import { uploadImage } from '../services/api';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    try {
      await uploadImage(formData);
      setMessage('Image uploaded successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload Image</h3>
      {message && <p style={{color: message.includes('successfully') ? 'green' : 'red'}}>{message}</p>}
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadImage;
