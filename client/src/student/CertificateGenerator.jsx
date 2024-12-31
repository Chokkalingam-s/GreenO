import { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const CertificateGenerator = ({ userId }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    axios
      .get(`/api/user/${userId}`)
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching user data:', error))
  }, [userId])

  const downloadCertificate = () => {
    const certificateElement = document.getElementById('certificate')
    html2canvas(certificateElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`${userData.name}_Certificate.pdf`)
    })
  }

  return (
    <div>
      {userData ? (
        <div>
          <div id='certificate' style={certificateStyle}>
            <h1>Certificate of Achievement</h1>
            <p>This is to certify that</p>
            <h2>{userData.name}</h2>
            <p>has successfully completed the course.</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
          <button onClick={downloadCertificate}>Download as PDF</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}

const certificateStyle = {
  width: '800px',
  height: '600px',
  border: '10px solid #000',
  padding: '20px',
  textAlign: 'center',
  background: '#f9f9f9',
  margin: 'auto',
}

export default CertificateGenerator
