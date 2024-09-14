import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './UploadSnaps.css';

function UploadSnaps() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]); 

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Generate a 6-character random captcha
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(captcha);
    setCaptchaInput(''); // Reset the input when captcha is regenerated
    setIsCaptchaValid(false); // Reset captcha validation
    setIsUploadEnabled(false); // Disable the upload button again
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    validateUpload(e.target.files[0], isCaptchaValid);
  };

  // Validate captcha input
  const handleCaptchaInput = (e) => {
    setCaptchaInput(e.target.value);
  };

  // Enable upload only if captcha is correct and file is selected
  const validateUpload = (selectedFile, captchaIsValid) => {
    if (selectedFile && captchaIsValid) {
      setIsUploadEnabled(true);
    } else {
      setIsUploadEnabled(false);
    }
  };

  // Handle captcha verification
  const handleVerifyCaptcha = () => {
    if (captchaInput === captcha) {
      toast.success('Captcha verified successfully!');
      setIsCaptchaValid(true);
      validateUpload(file, true); // Re-validate the upload
    } else {
      toast.error('Captcha is incorrect. Please try again.');
      setIsCaptchaValid(false);
    }
  };

  useEffect(() => {
    generateCaptcha();

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
    if (!isCaptchaValid) {
      toast.error('Captcha is incorrect. Please try again.');
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
      toast.success('File uploaded successfully!');
      setUploadedImages([...uploadedImages, response.data.filePath]); 
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='grid-container'>
      <ToastContainer /> {/* Toast Container to display alerts */}
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
      <div className='upload-snaps-container'>
        <div className='upload-snaps-content'>
          <div className='upload-snaps-body'>
            <h2>Upload Snap</h2>

            <div className='captcha-section'>
              <p className='captcha'>{captcha}</p>
              <input
                type='text'
                placeholder='Enter captcha'
                value={captchaInput}
                onChange={handleCaptchaInput}
              />
              <button className='verify-check' onClick={handleVerifyCaptcha}>Verify Captcha</button> {/* Verify Button */}
            </div>
            
            <div className='upload-section'>
              <input type='file' onChange={handleFileChange} />
              <button onClick={handleUpload} disabled={!isUploadEnabled}>
                Upload Snap
              </button>
            </div>

            {message && <p>{message}</p>}

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
      </main>
    </div>
  );
}

export default UploadSnaps;
