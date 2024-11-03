import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ studentId }: { studentId: string }) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('studentId', studentId); // Pass student ID to backend

      setUploading(true);

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axios.post('/api/students/upload', formData, config);

        console.log('Image uploaded:', data.filePath);
        setUploading(false);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={uploadFileHandler} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
