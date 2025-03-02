import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/get-uploaded-images-count', (req, res) => {
  res.json({uploadedImagesCount: 5})
})

app.get('/student-get-user-details', (req, res) => {
  res.json({
    id: 17,
    role: 'student',
    name: 'enrcyotedStudent1',
    email: 'encryptStud1@rmkec.ac.in',
    mobileNumber: '9894703845',
    state: 'Tamil Nadu',
    district: 'Dindigul',
    collegeName: 'R.M.K. Engineering College',
    department: 'Information Technology',
    collegeRegisterNumber: '111724203016',
    yearOfGraduation: '2027',
    aadharNumber: '123345687896',
    principalName: null,
    pocNumber: null,
    dob: '2010-02-10',
    secEmail: 'chokka7878@gmail.com',
    uploadCount: 2,
    createdAt: '2025-01-14T12:30:25.000Z',
    updatedAt: '2025-01-14T13:32:48.000Z'
  })
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
