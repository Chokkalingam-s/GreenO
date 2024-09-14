import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './MyActivities.css';

function MyActivities() {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [filter, setFilter] = useState('All'); 

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-uploaded-images', {
          headers: { Authorization: `Bearer ${token}` },
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

  const filteredImages = filter === 'All' ? images : images.filter(image => image.semester === filter);

  return (
    <div className="grid-container">
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className="main-container my-activities-container">
        <div className="filters">
          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
          {[...Array(8).keys()].map(i => (
            <button
              key={i}
              className={filter === `Semester ${i + 1}` ? 'active' : ''}
              onClick={() => setFilter(`Semester ${i + 1}`)}
            >
              Semester {i + 1}
            </button>
          ))}
        </div>

        <div className="my-activities-content">
          <h2>My Uploaded Photos</h2>
          <div className="gallery-container">
            {filteredImages.length === 0 ? (
              <p className="no-images-placeholder">No images uploaded for {filter === 'All' ? 'any semester' : filter}.</p>
            ) : (
              filteredImages.map((image, index) => (
                <div key={index} className="image-card">
                  <img
                    className="image-card-img"
                    src={`http://localhost:3000/${image.filePath}`}
                    alt={`Semester ${image.semester}`}
                  />
                  <div className="image-card-content">
                    <h3>{image.semester}</h3>
                    <p>{image.description}</p>
                    <button className="cta-button">View More</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyActivities;
