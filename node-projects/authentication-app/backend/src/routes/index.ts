import { Router } from 'express';

// Routes - Import
import userRoute from '../modules/User/routes';

const routes = Router();

// User router
routes.use('/user', userRoute);

export default routes;
