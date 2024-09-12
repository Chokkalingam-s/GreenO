import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './UploadSnaps.css';

function UploadSnaps() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]); 

  const handleFileChange = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    
    const fetchUploadedSnaps = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/uploaded-snaps', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUploadedImages(response.data); 
      } catch (error) {
        console.error('Error fetching uploaded snaps:', error);
      }
    };

    fetchUploadedSnaps(); 
  }, []); 

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file);
  
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.post('http://localhost:3000/api/upload-snap', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('File uploaded successfully.');

      setUploadedImages([...uploadedImages, response.data.filePath]); 
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='grid-container'>
    <StudentHeader OpenSidebar={OpenSidebar} />
    <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    <div className='upload-snaps-container'>

      <div className='upload-snaps-content'>

        <div className='upload-snaps-body'>
          <h2>Upload Snap</h2>
          
            <div className='upload-section'>
              <input type='file' onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload Snap</button>
            </div>
        
          
          
          <div className='uploaded-images'>
            {uploadedImages.length > 0 ? (
              uploadedImages.map((image, index) => (
                <div key={index} className='uploaded-image'>
                  <img src={`http://localhost:3000/uploads/${image.filename}`} alt={`Uploaded ${index}`} />
                </div>
              ))
            ) : (
              <p>No images uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UploadSnaps;
