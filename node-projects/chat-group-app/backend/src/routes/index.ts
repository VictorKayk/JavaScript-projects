import { Router } from 'express';

// Routes - Import
import user from '../modules/User/routes';
import channel from '../modules/Channel/routes';

// Middlewares
import isAuth from '../shared/middlewares/isAuth';

const routes = Router();

// User router
routes.use('/user', user);

// Channel router
routes.use('/channel', isAuth, channel);

export default routes;
