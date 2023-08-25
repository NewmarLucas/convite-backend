import { Router } from 'express';
import { homeController } from './controllers/HomeController';
import { usersController } from './controllers/UsersController';

const router: Router = Router();

// Routes
router.get('/', homeController.home);

// users
router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersController.createUsers);

// confirmations
router.get('/confirmations', usersController.getConfirmations);
router.put('/confirmate/:id', usersController.handleConfirmate);

export { router };
