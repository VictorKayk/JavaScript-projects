import { Router } from 'express';

// Routes - Import
import user from '../modules/User/routes';
import channel from '../modules/Channel/routes';

const routes = Router();

// User router
routes.use('/user', user);

// Channel router
routes.use('/channel', channel);

export default routes;
