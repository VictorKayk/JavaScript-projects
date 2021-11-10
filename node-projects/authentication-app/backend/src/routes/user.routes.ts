import { Router } from 'express';

// Use cases
import registerUser from '../modules/User/useCases/registerUser';
import loginUser from '../modules/User/useCases/loginUser';

const routes = Router();

// User routes
// Register
// POST
routes.post('/register', (req, res) => registerUser.handle(req, res));
// Login
// POST
routes.post('/login', (req, res) => loginUser.handle(req, res));

export default routes;
