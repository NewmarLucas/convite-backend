import { Router } from 'express';
import { authenticateJWT } from './middlewares/auth';
import { homeController } from './controllers/HomeController';
import { adminController } from './controllers/AdminController';
import { usersController } from './controllers/UsersController';
import { fileController } from './controllers/FileController';

const router: Router = Router();

// Routes
// public
router.get('/', homeController.home);
router.get('/users/:id', usersController.getUser);
router.put('/confirmate/:id', usersController.handleConfirmate);

// admin
router.post('/login', adminController.login);
// router.post('/admin', adminController.createAdmin);
router.get('/confirmations', authenticateJWT, usersController.getConfirmations);

// users
router.get('/users', authenticateJWT, usersController.getUsers);
router.post('/users', authenticateJWT, usersController.createUsers);
router.get('/url', authenticateJWT, usersController.getLink);

// file
router.get('/file-data', authenticateJWT, fileController.getData);

export { router };
