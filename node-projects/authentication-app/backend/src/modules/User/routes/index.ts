import multer from 'multer';
import { Router } from 'express';

// Config
import uploadConfig from '../../../configs/upload';

// Middlewares
import isAuth from '../../../shared/middlewares/isAuth';
import userIs from '../../../shared/middlewares/userIs';
import { googleLoginAuth, googleLoginAuthCb } from '../../../shared/middlewares/googleOAuth';
import { githubLoginAuth, githubLoginAuthCb } from '../../../shared/middlewares/githubAuth';

// Use cases
import registerUser from '../useCases/internal/register';
import loginUser from '../useCases/internal/login';
import githubLogin from '../useCases/external/githubLogin';
import googleLogin from '../useCases/external/googleLogin';
import getAll from '../useCases/getAll';
import userProfile from '../useCases/getProfile';
import updateUserProfile from '../useCases/updateProfile';
import removeAvatar from '../useCases/avatar/remove';
import avatarUploadUrl from '../useCases/avatar/uploadUrl';
import avatarUpload from '../useCases/avatar/upload';
import readAllModerators from '../useCases/moderator/readAll';
import addModerator from '../useCases/moderator/add';
import removeModerator from '../useCases/moderator/remove';
import readAllAdmins from '../useCases/admin/readAll';

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
routes.get('/github', githubLoginAuth);
// GET
routes.get('/github/auth', githubLoginAuthCb, (req, res) => githubLogin.handle(req, res));

// Google routes
// GET
routes.get('/google', googleLoginAuth);
// GET
routes.get('/google/auth', googleLoginAuthCb, (req, res) => googleLogin.handle(req, res));

// User profile routes
// GET
routes.get('/all', isAuth, userIs(['moderator', 'admin']), (req, res) => getAll.handle(req, res));
// GET
routes.get('/', isAuth, (req, res) => userProfile.handle(req, res));
// PATCH
routes.patch('/', isAuth, (req, res) => updateUserProfile.handle(req, res));

// User avatar routes
// POST - Upload avatar
routes.post('/avatar', isAuth, upload.single('avatar'), (req, res) => avatarUpload.handle(req, res));
// POST - Upload avatar url
routes.post('/avatar/url', isAuth, (req, res) => avatarUploadUrl.handle(req, res));
// DELETE - Remove avatar
routes.delete('/avatar', isAuth, (req, res) => removeAvatar.handle(req, res));

// Moderator routes
// READ
routes.get('/moderator', isAuth, userIs(['admin']), (req, res) => readAllModerators.handle(req, res));
// POST
routes.post('/:id/moderator', isAuth, userIs(['admin']), (req, res) => addModerator.handle(req, res));
// DELETE
routes.delete('/:id/moderator', isAuth, userIs(['admin']), (req, res) => removeModerator.handle(req, res));

// Admin routes
// READ
routes.get('/admin', isAuth, userIs(['admin']), (req, res) => readAllAdmins.handle(req, res));

export default routes;
