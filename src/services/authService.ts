import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/adminModel';

const secretKey = String(process.env?.JWT_SECRET_KEY);

interface IAdmin {
  name: string;
}

function checkPassword(password: string, userPassword: string) {
  return new Promise((resolve) => {
    bcrypt.compare(password, userPassword, async (err, isMatch) => {
      resolve(isMatch);
    });
  });
}

function generateToken(payload: IAdmin) {
  return new Promise((resolve) => {
    const token = jwt.sign(payload, secretKey);
    resolve(token);
  });
}

async function authenticateUser(
  name: string,
  password: string
): Promise<string | { token: string }> {
  const user = await Admin.findOne({ name });
  if (user && user?.password) {
    const isValidPassword = await checkPassword(password, user.password);
    if (isValidPassword) {
      const token = await generateToken({ name });
      return { token: String(token) };
    }
  }
  return 'unauthorized';
}

export { authenticateUser };
