import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@vasustudio.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@vasustudio.com',
        password: 'password123', // I will set it to password123 as requested by general convention or 123456
        role: 'Admin',
        phone: '9999999999',
      });
      console.log('Admin user created successfully! Email: admin@vasustudio.com, Password: password123');
    } else {
      console.log('Admin user already exists!');
    }
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
