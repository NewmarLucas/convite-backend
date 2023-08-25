import { Request, Response } from 'express';

class HomeController {
  public async home(_: Request, res: Response) {
    return res.json({
      success: true,
      data: null,
    });
  }
}

export const homeController = new HomeController();
