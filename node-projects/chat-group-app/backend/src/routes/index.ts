import { Router } from 'express';

// Routes - Import
import user from '../modules/User/routes';
import chat from '../modules/Chat/routes';

const routes = Router();

// User router
routes.use('/user', user);

// Chat router
routes.use('/', chat);

export default routes;
