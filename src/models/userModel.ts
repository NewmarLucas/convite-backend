import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  cellphone: {
    type: String,
    required: [true, 'Cellphone is required'],
  },
  confirmation: {
    type: Boolean,
    required: true,
  },
  companions: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

export { User };
