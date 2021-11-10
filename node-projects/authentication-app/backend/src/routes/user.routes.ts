import { Router } from 'express';

// Use cases
import registerUser from '../modules/User/useCases/registerUser';
import loginUser from '../modules/User/useCases/loginUser';
import {
  GithubLogin,
  githubLoginController,
} from '../modules/User/useCases/githubLogin';

const routes = Router();

// User routes
// Register
// POST
routes.post('/register', (req, res) => registerUser.handle(req, res));
// Login
// POST
routes.post('/login', (req, res) => loginUser.handle(req, res));

// Github routes
// GET
routes.get('/register/github', (req, res) =>
  new GithubLogin().handle(req, res),
);
// GET
routes.get('/register/github/auth', (req, res) =>
  githubLoginController.handle(req, res),
);

export default routes;
