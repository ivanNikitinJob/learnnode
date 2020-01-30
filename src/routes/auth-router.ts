import AuthController from '../controllers/auth-controller';
import express, { Router } from 'express';

class AuthRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.post('/login', AuthController.login_post);
        this.router.post('/logout', AuthController.logout_post);
        this.router.post('/register', AuthController.register_post);
    }
}

export default new AuthRouter().router;