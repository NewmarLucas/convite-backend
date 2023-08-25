import { Request, Response } from 'express';
import * as userService from '../services/userService';

class UsersController {
  public async createUsers(req: Request, res: Response) {
    const data = req.body;
    const response = await userService.createUser(data);

    if (response == 'invalid payload') {
      res.status(400).json({
        success: false,
        data: 'Dados inválidos.',
      });
    }

    return res.json({
      success: true,
      data: response,
    });
  }
  public async getUsers(_: Request, res: Response) {
    const users = await userService.getUsers();
    return res.json({
      success: true,
      data: users,
    });
  }
  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.getUser(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: 'Usuário não encontrado',
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  }
  public async handleConfirmate(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const response = await userService.handleConfirmate(id, data);

    if (response === 'user not found') {
      return res.status(404).json({
        success: false,
        data: 'Usuário não encontrado',
      });
    }

    if (response === 'invalid payload') {
      return res.status(400).json({
        success: false,
        data: 'Dados inválidos.',
      });
    }

    return res.json({
      success: true,
      data: response,
    });
  }
  public async getConfirmations(_: Request, res: Response) {
    const data = await userService.getConfirmationData();
    return res.json({
      success: true,
      data,
    });
  }
}

export const usersController = new UsersController();
