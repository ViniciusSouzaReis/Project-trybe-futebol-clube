import { Router } from 'express';
import loginValidator from '../middlewares/loginValidator';
import checkAuthorization from '../middlewares/checkAuthorization';
import LoginController from '../controller/Login.controller';

const router = Router();
const loginController = new LoginController();

router.post('/', loginValidator, loginController.login.bind(loginController));
router.get('/validate', checkAuthorization, loginController.checkRole.bind(loginController));

export default router;
