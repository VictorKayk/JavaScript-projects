import multer from 'multer';
import { Router } from 'express';

// Config
import uploadConfig from '../../../configs/upload';
import auth from '../../../configs/authorizationConfig';

// Use cases
import registerUser from '../useCases/registerUser';
import loginUser from '../useCases/loginUser';
import {
  GithubLogin,
  githubLoginController,
} from '../useCases/githubLogin';
import userProfile from '../useCases/userProfile';
import updateUserProfile from '../useCases/updateUserProfile';
import removeAvatar from '../useCases/removeAvatar';
import avatarUploadUrl from '../useCases/avatarUploadUrl';
import avatarUpload from '../useCases/avatarUpload';

const routes = Router();

// Upload
const upload = multer(uploadConfig.upload('./tmp/uploads/avatar'));

// Register routes
// POST
routes.post('/register', (req, res) => registerUser.handle(req, res));

// Login routes
// POST
routes.post('/login', (req, res) => loginUser.handle(req, res));

// Github routes
// GET
routes.get('/github', (req, res) =>
  new GithubLogin().handle(req, res),
);
// GET
routes.get('/github/auth', (req, res) =>
  githubLoginController.handle(req, res),
);

// User profile routes
// GET
routes.get('/', auth, (req, res) => userProfile.handle(req, res));
// PATCH
routes.patch('/', auth, (req, res) => updateUserProfile.handle(req, res));

// User avatar routes
// POST - Upload avatar
routes.post('/avatar', auth, upload.single('avatar'), (req, res) => avatarUpload.handle(req, res));
// POST - Upload avatar url
routes.post('/avatar/url', auth, (req, res) => avatarUploadUrl.handle(req, res));
// DELETE - Remove avatar
routes.delete('/avatar', auth, (req, res) => removeAvatar.handle(req, res));

export default routes;
