const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sequelize = require('./db');
const User = require('./models/User');
const UploadSnap = require('./models/UploadSnap'); 
const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); 
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const email = req.user.email; 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${email}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

app.post('/signup', async (req, res) => {
  const { role, name, email, password, mobileNumber, state, district, collegeName, department, collegeRegisterNumber, yearOfGraduation, aadharNumber, principalName, pocNumber } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      role,
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      state,
      district,
      collegeName,
      department: role === 'student' ? department : null,
      collegeRegisterNumber: role === 'student' ? collegeRegisterNumber : null,
      yearOfGraduation: role === 'student' ? yearOfGraduation : null,
      aadharNumber: role === 'student' ? aadharNumber : null,
      principalName: role === 'admin' ? principalName : null,
      pocNumber: role === 'admin' ? pocNumber : null,
    });

    const token = jwt.sign({ userId: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.role !== role) {
      console.log(`User role in DB: ${user.role}, Role provided: ${role}`);
      return res.status(400).json({ message: 'Role does not match' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/upload-snap', authenticateToken, upload.single('file'), async (req, res) => {
  const { email } = req.user; 
  
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const relativeFilePath = `uploads/${req.file.filename}`;  

    const newUploadSnap = await UploadSnap.create({
      email: email,
      filename: req.file.filename,
      filePath: relativeFilePath  
    });

    res.status(200).json({ message: 'File uploaded successfully.', filePath: relativeFilePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/get-uploaded-images', authenticateToken, async (req, res) => {
  const { email } = req.user; 
  
  try {
    const uploadedImages = await UploadSnap.findAll({
      where: { email: email },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(uploadedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/uploaded-snaps', authenticateToken, async (req, res) => {
  const { email } = req.user; 

  try {
     
    const uploads = await UploadSnap.findAll({ where: { email } });
    res.status(200).json(uploads);
  } catch (error) {
    console.error('Error fetching uploaded snaps:', error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
