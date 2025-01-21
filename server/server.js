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
const sharp = require('sharp');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_SECRET_KEY; 
const iv = crypto.randomBytes(16); 
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const result = `${iv.toString('hex')}:${encrypted}`;
  return result;
}
function decrypt(text) {
  try {
    const [ivText, encryptedText] = text.split(':');
    if (!ivText || !encryptedText) {
      throw new Error('Invalid encrypted data format');
    }
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey, 'hex'),
      Buffer.from(ivText, 'hex')
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption Error:', error.message);
    throw error;
  }
}
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

app.post('/send-otp-process', (req, res) => {
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

app.post('/verify-otp-process', (req, res) => {
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

app.post('/student-signup', async (req, res) => {
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
    dob,  
    secEmail  
  } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const encryptedMobile = encrypt(mobileNumber);
    const encryptedAadhar = encrypt(aadharNumber);
    const newUser = await User.create({
      role,
      name,
      email,
      password: hashedPassword,
      mobileNumber: encryptedMobile,
      state,
      district,
      collegeName,
      department: role === 'student' ? department : 'Default Admin Department',
      collegeRegisterNumber: role === 'student' ? collegeRegisterNumber : null,
      yearOfGraduation: role === 'student' ? yearOfGraduation : null,
      aadharNumber: role === 'student' ? encryptedAadhar : null,
      principalName: role === 'admin' ? principalName : null,
      pocNumber: role === 'admin' ? pocNumber : null,
      dob,  
      secEmail  
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


app.post('/student-signin', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

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

const compareImages = async (imgPath1, imgPath2) => {
  const resizeOptions = { width: 8, height: 8 }; 

  const img1 = await sharp(imgPath1).resize(resizeOptions).grayscale().raw().toBuffer();
  const img2 = await sharp(imgPath2).resize(resizeOptions).grayscale().raw().toBuffer();

  let similarityCount = 0;
  for (let i = 0; i < img1.length; i++) {
    if (Math.abs(img1[i] - img2[i]) < 20) similarityCount++;
  }

  return (similarityCount / img1.length) * 100; 
};


const MAX_DISTANCE_METERS = 50;
const FOUR_MONTHS_IN_MILLIS = 4 * 30 * 24 * 60 * 60 * 1000;
app.post('/student-upload-snap-page', authenticateToken, upload.single('file'), async (req, res) => {
  const { email } = req.user;
  const { latitude, longitude } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const originalFilePath = req.file.path;
    const fileSizeInBytes = fs.statSync(originalFilePath).size;

    let relativeFilePath = `uploads/${req.file.filename}`;

    if (fileSizeInBytes > 500 * 1024) {
      const compressedFilePath = `uploads/compressed_${req.file.filename}`;

      await sharp(originalFilePath)
        .resize({ width: 1024, withoutEnlargement: true }) 
        .jpeg({ quality: 80 })
        .toFile(compressedFilePath);

      fs.unlinkSync(originalFilePath);

      relativeFilePath = compressedFilePath;
    }

    const lastUpload = await UploadSnap.findOne({
      where: { email },
      order: [['createdAt', 'DESC']],
    });

    const currentTime = new Date();

    if (lastUpload) {
      const lastUploadTime = new Date(lastUpload.createdAt);
      const timeDifference = currentTime - lastUploadTime;

      if (timeDifference < FOUR_MONTHS_IN_MILLIS) {
        return res.status(403).json({
          message: 'You can upload a new image only after 4 months from your last upload.',
        });
      }

      const lastLatitude = decrypt(lastUpload.latitude);
      const lastLongitude = decrypt(lastUpload.longitude);

      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(lastLatitude),
        parseFloat(lastLongitude)
      );

      if (distance > MAX_DISTANCE_METERS) {
        return res.status(400).json({
          message: `Location mismatch: Images must be uploaded within ${MAX_DISTANCE_METERS} meters of the original location.`,
        });
      }

      const similarityScore = await compareImages(
        relativeFilePath,
        path.join(uploadDir, lastUpload.filename)
      );

      if (similarityScore < 70) {
        return res.status(400).json({
          message: `The uploaded image is too different from the previous image (Similarity: ${similarityScore.toFixed(2)}%).`,
        });
      }
    }

    const encryptedLatitude = encrypt(latitude);
    const encryptedLongitude = encrypt(longitude);

    const lastCount = lastUpload ? lastUpload.count : 0;

    const newCount = lastCount + 1;

    await UploadSnap.create({
      email,
      filename: relativeFilePath.split('/').pop(),
      filePath: relativeFilePath,
      count: user.uploadCount + 1,
      lastUpload: currentTime,
      latitude: encryptedLatitude,
      longitude: encryptedLongitude,
      count: newCount,
      createdAt: currentTime,
    });

    user.uploadCount += 1;
    user.lastUpload = currentTime;
    await user.save();

    if (user.uploadCount === 1) {
      const adminEntry = await Admin.findOne({
        where: { collegeName: user.collegeName, department: user.department },
      });

      if (adminEntry) {
        adminEntry.uploadCount += 1;
        await adminEntry.save();
      }
    }

    res.status(200).json({
      message: 'File uploaded successfully.',
      filePath: relativeFilePath,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});



function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusMeters = 6371000; 
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusMeters * c;

  console.log(`Calculated distance: ${distance} meters`);

  return distance;
}

app.get('/student-get-uploaded-images', authenticateToken, async (req, res) => {
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

app.get( '/get-uploaded-images-count', authenticateToken, async (req, res) => {
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

app.get('/student-get-user-details', authenticateToken, async (req, res) => {
  const { email } = req.user;

  try {
    const studentDetails = await User.findOne({
      where: { email },
    });

    if (!studentDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const decryptedMobile = decrypt(studentDetails.mobileNumber);
    const decryptedAadhar = decrypt(studentDetails.aadharNumber);

    const userData = {
      ...studentDetails.toJSON(),
      mobileNumber: decryptedMobile,
      aadharNumber: decryptedAadhar,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/student-uploaded-snaps', authenticateToken, async (req, res) => {
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

app.get('/college-overall-student-count',authenticateToken, async (req, res) => {
  try {
    const { email } = req.user
    const user = await User.findOne({
      where: { email },
      attributes: ['collegeName'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { collegeName } = user;
    const studentCount = await User.count({ where: { role: 'student', collegeName } })
    const saplingCount = await User.count({
      where: { uploadCount: { [Op.gt]: 0 } , collegeName },
    })
    res.status(200).json({ studentCount, saplingCount })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: error.message })
  }
})

app.get('/college-admin-data', authenticateToken, async (req, res) => {
  const { email } = req.user

  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ['collegeName'],
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const collegeName = user.collegeName

    const adminData = await Admin.findAll({
      where: { collegeName: collegeName },
      attributes: ['department', 'uploadCount', 'studentCount'],
    })

    res.status(200).json(adminData)
  } catch (error) {
    console.error('Error fetching admin data:', error)
    res.status(500).json({ error: error.message })
  }
})
app.get('/college-overall-progress', authenticateToken, async (req, res) => {
  const { email } = req.user

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

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1 

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
          const graduationYear = parseInt(user.yearOfGraduation, 10)
          let yearDifference = graduationYear - currentYear

          if (currentMonth > 6) {
            yearDifference--;  
          }

          if (yearDifference === 3) {
            departmentData.yearCounts.firstYear += 1
          } else if (yearDifference === 2) {
            departmentData.yearCounts.secondYear += 1
          } else if (yearDifference === 1) {
            departmentData.yearCounts.thirdYear += 1
          } else if (yearDifference === 0) {
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

app.get('/departmentwise-student-data', authenticateToken, async (req, res) => {
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

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; 
    const yearCounts = {
      '1st Year': 0,
      '2nd Year': 0,
      '3rd Year': 0,
      '4th Year': 0,
    };
    
    const yearDistribution = await User.findAll({
      where: { department, role: 'student' },
      attributes: ['yearOfGraduation'],
    });
    
    yearDistribution.forEach(({ yearOfGraduation }) => {
      const graduationYear = parseInt(yearOfGraduation, 10);
      const graduationMonth = 6;

      let yearDifference = graduationYear - currentYear;

      if (currentMonth > 6) {
        yearDifference--;  
      }
      
      switch (yearDifference) {
        case 3:
          yearCounts['1st Year']++;
          break;
        case 2:
          yearCounts['2nd Year']++;
          break;
        case 1:
          yearCounts['3rd Year']++;
          break;
        case 0:
          yearCounts['4th Year']++;
          break;
        default:
          break;
      }
    });
 
    res.status(200).json({ totalStudents, totalSaplings, yearCounts })
  } catch (error) {
    console.error('Error fetching department data:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching department data.' })
  }
})
app.get('/departmentwise-progress-data', authenticateToken, async (req, res) => {
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

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // January is 0, so we add 1
    
    const responseData = students.map(student => {
      const graduationYear = parseInt(student.yearOfGraduation, 10);
      let currentYearProgress;
    
      // Calculate the difference between the current year and graduation year
      let yearDifference = graduationYear - currentYear;
    
      // Adjust the year difference based on the current month
      if (currentMonth > 6) {
        yearDifference--;  // If current month is after June, the student is a year ahead
      }
    
      // Assign current year based on the adjusted year difference
      if (yearDifference === 3) {
        currentYearProgress = 1;  // 1st Year
      } else if (yearDifference === 2) {
        currentYearProgress = 2;  // 2nd Year
      } else if (yearDifference === 1) {
        currentYearProgress = 3;  // 3rd Year
      } else if (yearDifference === 0) {
        currentYearProgress = 4;  // 4th Year
      } else {
        currentYearProgress = 0;  // For cases where graduation year is earlier than current year
      }
    
      return {
        name: student.name,
        registerNumber: student.collegeRegisterNumber,
        currentYear: currentYearProgress,
        uploadCount: student.uploadCount,
      };
    })

    res.status(200).json(responseData)
  } catch (error) {
    console.error('Error fetching department progress:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
app.get('/new-department-data', authenticateToken, async (req, res) => {
  try {
    
    const { email } = req.user;
    const user = await User.findOne({
      where: { email },
      attributes: ['collegeName'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { collegeName } = user;

    const departments = await Admin.findAll({
      where: { collegeName },
      attributes: ['department', 'studentCount', 'uploadCount'],
    })

    res.status(200).json(departments)
  } catch (error) {
    console.error('Error fetching department data:', error)
    res.status(500).json({ error: error.message })
  }
})
app.get('/new-user-details', authenticateToken, async (req, res) => {
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
