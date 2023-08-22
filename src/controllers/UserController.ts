import { Request, Response } from 'express';
import { User } from '../models/userModel';

class UserController {
  public async home(req: Request, res: Response) {
    const users = await User.find();
    return res.json({
      success: true,
      data: users,
    });
  }
}

export const userController = new UserController();
