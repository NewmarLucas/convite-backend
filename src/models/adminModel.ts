import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const Admin = mongoose.model('Admin', adminSchema);

export { Admin };
