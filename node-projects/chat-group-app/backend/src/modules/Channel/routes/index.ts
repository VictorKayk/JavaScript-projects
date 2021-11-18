import { Router } from 'express';

// Middlewares
import auth from '../../../shared/middlewares/auth';

// Controllers
import createChannel from '../useCases/createChannel';

const routes = Router();

// Channel routes
// POST
routes.post('/', auth.handle, (req, res) => createChannel.handle(req, res));

export default routes;
