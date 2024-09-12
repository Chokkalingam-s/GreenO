import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './MyActivities.css';

function MyActivities() {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-uploaded-images', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (token) {
      fetchImages();
    }
  }, [token]);

  return (
    <div className='my-activities-container'>
      <StudentHeader />
      <div className='my-activities-content'>
        <StudentSideBar />
        <div className='my-activities-body'>
          <h2>My Uploaded Photos</h2>
          <div className='image-gallery'>
            {images.length === 0 ? (
              <p>No images uploaded yet.</p>
            ) : (
              images.map((image, index) => (
                <div key={index} className='image-item'>
                  <img src={`http://localhost:3000/${image.filePath}`} alt={`Semester ${index + 1}`} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyActivities;
