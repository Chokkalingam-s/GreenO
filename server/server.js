const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors()); 
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

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
      mobileNumber: role === 'student' ? mobileNumber : null,
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

    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
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
