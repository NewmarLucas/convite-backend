import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authenticateUser } from '../services/authService';
import { Admin } from '../models/adminModel';

class AdminController {
  public async login(req: Request, res: Response) {
    const { name, password } = req.body;
    const response = await authenticateUser(name, password);

    if (typeof response === 'string')
      return res
        .status(401)
        .json({ success: false, message: 'Credenciais inválidas' });

    if (response?.token) {
      res.status(200).json({ success: true, token: response?.token });
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Credenciais inválidas' });
    }
  }
  public async createAdmin(req: Request, res: Response) {
    const data = req.body;
    if (!data?.name || !data?.password)
      return res.status(422).json({ success: false });

    bcrypt.genSalt(Number(process.env?.SALT_WORK_FACTOR ?? 4), (err, salt) => {
      if (err) return res.status(500).json({ success: false });

      bcrypt.hash(data.password, salt, async function (err, hash) {
        if (err) return res.status(500).json({ success: false });

        try {
          const admin = await Admin.create({ name: data.name, password: hash });
          if (admin) {
            return res.status(200).json({ success: true, data: admin });
          } else {
            return res.status(400).json({ success: false });
          }
        } catch (error) {
          return res.status(500).json({ success: false });
        }
      });
    });
  }
}

export const adminController = new AdminController();
