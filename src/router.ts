import { Router } from 'express';
import { authenticateJWT } from './middlewares/auth';
import { homeController } from './controllers/HomeController';
import { adminController } from './controllers/AdminController';
import { usersController } from './controllers/UsersController';
import { fileController } from './controllers/FileController';

const router: Router = Router();

// Routes
router.get('/', homeController.home);

// users
router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersController.createUsers);
router.get('/url', usersController.getLink);

// confirmations
router.put('/confirmate/:id', usersController.handleConfirmate);

// file
router.get('/file-data', fileController.getData);

// admin
router.post('/login', adminController.login);
router.post('/admin', adminController.createAdmin);
router.get('/confirmations', authenticateJWT, usersController.getConfirmations);

export { router };
