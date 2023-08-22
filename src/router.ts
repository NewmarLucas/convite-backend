import { Router } from 'express';
import { userController } from './controllers/UserController';

const router: Router = Router();

// Routes
router.get('/', userController.home);

export { router };
