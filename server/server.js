const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const sequelize = require('./db')
const User = require('./models/User')
const Admin = require('./models/Admin')
const UploadSnap = require('./models/UploadSnap')
const app = express()
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')

app.use(express.json())
app.use(cors())
const OTP_EXPIRATION = 5 * 60 * 1000

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
const uploadDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const email = req.user.email
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${email}-${uniqueSuffix}${path.extname(file.originalname)}`)
  },
})

const upload = multer({ storage })
const otps = {}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

app.post('/send-otp', (req, res) => {
  const { email } = req.body

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  otps[email] = otp

  console.log(`Stored OTP for ${email}: ${otp}`)

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
      return res.status(500).send('Error sending email.')
    }
    res.status(200).send('OTP sent to email.')
  })
})

app.post('/forgot-password', (req, res) => {
  const { email } = req.body

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  otps[email] = otp

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Password Reset OTP Code',
    text: `Your OTP code for resetting your password is: ${otp}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP email.')
    }
    res.status(200).send('OTP sent to email.')
  })
})

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body

  const storedOtp = otps[email]

  if (!storedOtp) {
    return res.status(400).send('No OTP found for this email.')
  }

  if (otp === storedOtp) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
    res.status(200).send({ success: true, token })
  } else {
    res.status(400).send('Invalid OTP.')
  }
})

app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body
  console.log('Received request to reset password:', {
    email,
    otp,
    newPassword,
  })

  const storedOtp = otps[email]
  console.log('Current stored OTPs:', otps)

  if (!storedOtp) {
    return res.status(400).send('No OTP found for this email.')
  }
  if (otp === storedOtp) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await User.update({ password: hashedPassword }, { where: { email } })

      delete otps[email]
      res.status(200).send('Password reset successfully.')
    } catch (error) {
      console.error('Error updating password:', error)
      res.status(500).send('Error resetting password.')
    }
  } else {
    return res.status(400).send('Invalid OTP.')
  }
})

app.post('/signup', async (req, res) => {
  const {
    role,
    name,
    email,
    password,
    mobileNumber,
    state,
    district,
    collegeName,
    department,
    collegeRegisterNumber,
    yearOfGraduation,
    aadharNumber,
    principalName,
    pocNumber,
  } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      role,
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      state,
      district,
      collegeName,
      department: role === 'student' ? department : 'Default Admin Department',
      collegeRegisterNumber: role === 'student' ? collegeRegisterNumber : null,
      yearOfGraduation: role === 'student' ? yearOfGraduation : null,
      aadharNumber: role === 'student' ? aadharNumber : null,
      principalName: role === 'admin' ? principalName : null,
      pocNumber: role === 'admin' ? pocNumber : null,
    })

    let adminEntry

    if (role === 'student') {
      adminEntry = await Admin.findOne({ where: { collegeName, department } })

      if (adminEntry) {
        await Admin.update(
          { studentCount: adminEntry.studentCount + 1 },
          { where: { id: adminEntry.id } }
        )
      } else {
        await Admin.create({ collegeName, department, studentCount: 1 })
      }
    }

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(201).json({ message: 'User created successfully', token })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // if (user.role !== role) {
    //   console.log(`User role in DB: ${user.role}, Role provided: ${role}`);
    //   return res.status(400).json({ message: 'Role does not match' });
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    res
      .status(200)
      .json({ message: 'Login successful', token, userRole: user.role })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ error: error.message })
  }
})

const authenticateToken = (req, res, next) => {
  const token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.post(
  '/api/upload-snap',
  authenticateToken,
  upload.single('file'),
  async (req, res) => {
    const { email } = req.user
    const { latitude, longitude } = req.body

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' })
    }

    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const lastUpload = await UploadSnap.findOne({
        where: { email },
        order: [['createdAt', 'DESC']],
      })

      const currentTime = new Date()
      if (lastUpload) {
        const lastUploadTime = new Date(lastUpload.createdAt)
        const timeDifference = currentTime - lastUploadTime
        const fourMonthsInMillis = 4 * 30 * 24 * 60 * 60 * 1000

        if (timeDifference < fourMonthsInMillis) {
          return res.status(403).json({
            message:
              'You can upload a new image only after 4 months from your last upload.',
          })
        }
      }

      await User.update(
        {
          uploadCount: user.uploadCount + 1,
          lastUpload: currentTime,
        },
        { where: { email } }
      )

      const relativeFilePath = `uploads/${req.file.filename}`
      await UploadSnap.create({
        email: email,
        filename: req.file.filename,
        filePath: relativeFilePath,
        count: user.uploadCount + 1,
        lastUpload: currentTime,
        latitude: latitude,
        longitude: longitude,
      })

      const firstUpload = user.uploadCount === 0
      const adminEntry = await Admin.findOne({
        where: { collegeName: user.collegeName, department: user.department },
      })
      if (adminEntry && firstUpload) {
        await Admin.update(
          { uploadCount: adminEntry.uploadCount + 1 },
          { where: { id: adminEntry.id } }
        )
      }

      res.status(200).json({
        message: 'File uploaded successfully.',
        filePath: relativeFilePath,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)

app.get('/api/get-uploaded-images', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const uploadedImages = await UploadSnap.findAll({
      where: { email: email },
      order: [['createdAt', 'ASC']],
    })

    res.status(200).json(uploadedImages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(
  '/api/get-uploaded-images-count',
  authenticateToken,
  async (req, res) => {
    const { email } = req.user

    try {
      const latestUpload = await UploadSnap.findOne({
        where: { email: email },
        order: [['count', 'DESC']],
        attributes: ['count'],
      })

      const uploadedImagesCount = latestUpload ? latestUpload.count : 0

      res.status(200).json({ uploadedImagesCount })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)

app.get('/api/get-user-detailss', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const studentDetails = await User.findAll({
      where: { email: email },
    })

    res.status(200).json(studentDetails)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/uploaded-snaps', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const uploads = await UploadSnap.findOne({
      where: { email },
      order: [['createdAt', 'DESC']],
    })

    if (!uploads) {
      return res.status(404).json({ message: 'No images found for the user' })
    }

    res.status(200).json(uploads)
  } catch (error) {
    console.error('Error fetching uploaded snaps:', error)
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/student-count', async (req, res) => {
  try {
    const studentCount = await User.count({ where: { role: 'student' } })
    const saplingCount = await User.count({
      where: { uploadCount: { [Op.gt]: 0 } },
    })
    res.status(200).json({ studentCount, saplingCount })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/admin-data', authenticateToken, async (req, res) => {
  const { email } = req.user // Extract email from the authenticated user

  try {
    // Fetch user's collegeName based on their email from the User table
    const user = await User.findOne({
      where: { email: email },
      attributes: ['collegeName'], // Only select the collegeName field
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const collegeName = user.collegeName

    // Fetch rows from Admin table where collegeName matches the logged-in user's collegeName
    const adminData = await Admin.findAll({
      where: { collegeName: collegeName },
      attributes: ['department', 'uploadCount', 'studentCount'],
    })

    // Send the fetched data as a JSON response
    res.status(200).json(adminData)
  } catch (error) {
    console.error('Error fetching admin data:', error)
    res.status(500).json({ error: error.message })
  }
})
app.get('/api/overall-progress', authenticateToken, async (req, res) => {
  const { email } = req.user
  console.log('User Email:', email)

  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ['collegeName'],
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const collegeName = user.collegeName
    const admins = await Admin.findAll({
      where: { collegeName },
    })

    const users = await User.findAll({
      where: { collegeName },
    })

    const progressData = []

    admins.forEach(admin => {
      const departmentData = {
        department: admin.department,
        studentCount: admin.studentCount,
        uploadCount: admin.uploadCount,
        yearCounts: {
          firstYear: 0,
          secondYear: 0,
          thirdYear: 0,
          fourthYear: 0,
        },
      }

      users.forEach(user => {
        if (user.department === admin.department) {
          const currentYear = new Date().getFullYear()
          const graduationYear = parseInt(user.yearOfGraduation, 10)
          const year = graduationYear - currentYear + 1

          if (year === 1) {
            departmentData.yearCounts.firstYear += 1
          } else if (year === 2) {
            departmentData.yearCounts.secondYear += 1
          } else if (year === 3) {
            departmentData.yearCounts.thirdYear += 1
          } else if (year === 4) {
            departmentData.yearCounts.fourthYear += 1
          }
        }
      })

      progressData.push(departmentData)
    })

    res.status(200).json(progressData)
  } catch (error) {
    console.error('Error fetching overall progress:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.get('/api/department-student-data', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const hodUser = await User.findOne({
      where: { email, role: 'hod', adminType: 'hod' },
      attributes: ['collegeName', 'department'],
    })

    if (!hodUser) {
      return res.status(404).json({ message: 'HOD not found' })
    }

    const { collegeName, department } = hodUser
    const adminData = await Admin.findOne({
      where: { collegeName, department },
      attributes: ['studentCount', 'uploadCount'],
    })

    if (!adminData) {
      return res
        .status(404)
        .json({ message: 'No data found for this college and department' })
    }

    const totalStudents = adminData.studentCount
    const totalSaplings = adminData.uploadCount || 0

    const currentYear = new Date().getFullYear()
    const yearCounts = {
      '1st Year': 0,
      '2nd Year': 0,
      '3rd Year': 0,
      '4th Year': 0,
    }

    const yearDistribution = await User.findAll({
      where: { department, role: 'student' },
      attributes: ['yearOfGraduation'],
    })

    yearDistribution.forEach(({ yearOfGraduation }) => {
      const graduationYear = parseInt(yearOfGraduation, 10)
      const yearDifference = graduationYear - currentYear + 1

      switch (yearDifference) {
        case 1:
          yearCounts['1st Year']++
          break
        case 2:
          yearCounts['2nd Year']++
          break
        case 3:
          yearCounts['3rd Year']++
          break
        case 4:
          yearCounts['4th Year']++
          break
        default:
          break
      }
    })

    res.status(200).json({ totalStudents, totalSaplings, yearCounts })
  } catch (error) {
    console.error('Error fetching department data:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching department data.' })
  }
})
app.get('/api/department-progress', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const hodUser = await User.findOne({
      where: { email, role: 'hod', adminType: 'hod' },
      attributes: ['collegeName', 'department'],
    })

    if (!hodUser) {
      return res.status(404).json({ error: 'HOD user not found' })
    }
    const students = await User.findAll({
      where: {
        collegeName: hodUser.collegeName,
        department: hodUser.department,
        role: 'student',
      },
      attributes: [
        'name',
        'collegeRegisterNumber',
        'yearOfGraduation',
        'uploadCount',
      ],
    })

    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ error: 'No students found for this department' })
    }

    const currentYear = new Date().getFullYear()
    const responseData = students.map(student => {
      const graduationYear = parseInt(student.yearOfGraduation, 10)
      const diff = graduationYear - currentYear
      let currentYearProgress
      if (diff === 2) {
        currentYearProgress = 3
      } else if (diff === 1) {
        currentYearProgress = 4
      } else if (diff === 3) {
        currentYearProgress = 2
      } else if (diff === 4) {
        currentYearProgress = 1
      } else {
        currentYearProgress = null
      }

      return {
        name: student.name,
        registerNumber: student.collegeRegisterNumber,
        currentYear: currentYearProgress,
        uploadCount: student.uploadCount,
      }
    })

    res.status(200).json(responseData)
  } catch (error) {
    console.error('Error fetching department progress:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
app.get('/api/new-department-data', authenticateToken, async (req, res) => {
  try {
    const departments = await Admin.findAll({
      attributes: ['department', 'studentCount', 'uploadCount'],
    })

    res.status(200).json(departments)
  } catch (error) {
    console.error('Error fetching department data:', error)
    res.status(500).json({ error: error.message })
  }
})
app.get('/api/new-user-details', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const userDetails = await User.findOne({
      where: { email: email },
      attributes: [
        'name',
        'email',
        'mobileNumber',
        'collegeName',
        'department',
        'yearOfGraduation',
      ],
    })

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(userDetails)
  } catch (error) {
    console.error('Error fetching user details:', error)
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error)
  })
