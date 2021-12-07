import { Router } from 'express';

// Import
import user from '../modules/User/routes';

const routes = Router();

// User router
routes.use('/user', user);

export default routes;
