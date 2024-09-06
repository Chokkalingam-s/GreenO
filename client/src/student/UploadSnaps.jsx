import React, { useState } from 'react';
import axios from 'axios';
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './UploadSnaps.css';

function UploadSnaps() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleCheckEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/check-email', { email });
      if (response.data.role === 'student') {
        setMessage('Email verified. You can upload a photo.');
      } else {
        setMessage('This email is not associated with a student.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setMessage('Error checking email. Please try again.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/api/upload-snap', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully.');
      setUploadedImage(URL.createObjectURL(file));
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='upload-snaps-container'>
      <StudentHeader />
      <div className='upload-snaps-content'>
        <StudentSideBar />
        <div className='upload-snaps-body'>
          <h2>Upload Snap</h2>
          <div className='email-check'>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your email'
            />
            <button onClick={handleCheckEmail}>Check Email</button>
          </div>
          {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
          {message === 'Email verified. You can upload a photo.' && (
            <div className='upload-section'>
              <input type='file' onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload Snap</button>
              {uploadedImage && (
                <div className='uploaded-image'>
                  <img src={uploadedImage} alt='Uploaded' />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadSnaps;
