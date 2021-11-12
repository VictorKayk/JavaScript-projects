import { Router } from 'express';

// Middlewares
import auth from '../../../shared/middlewares/auth';

// Use cases
import registerUser from '../useCases/registerUser';
import loginUser from '../useCases/loginUser';
import {
  GithubLogin,
  githubLoginController,
} from '../useCases/githubLogin';
import userProfile from '../useCases/userProfile';
import editUserProfile from '../useCases/editUserProfile';

const routes = Router();

// Register routes
// POST
routes.post('/register', (req, res) => registerUser.handle(req, res));

// Login routes
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

// User profile routes
// GET
routes.get('/', auth.handle, (req, res) => userProfile.handle(req, res));
// PATCH
routes.patch('/', auth.handle, (req, res) => editUserProfile.handle(req, res));

export default routes;
