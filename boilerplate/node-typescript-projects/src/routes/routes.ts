import { Router } from 'express';

// Routes - Import
import exampleRoute from './example.routes';

const routes = Router();

// Router boilerplate
routes.use('/', exampleRoute);

export default routes;
