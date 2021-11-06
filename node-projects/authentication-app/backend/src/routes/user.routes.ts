import { Router } from 'express';

// Use cases
import registerUser from '../modules/User/useCases/registerUser';

const routes = Router();

// User routes
// Register
// POST
routes.post('/register', (req, res) => registerUser.handle(req, res));

export default routes;
