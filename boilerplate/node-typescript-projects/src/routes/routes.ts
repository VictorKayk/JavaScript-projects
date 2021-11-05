import { Router } from 'express';

const routes = Router();

// Router boilerplate
routes.get('/', (req, res) => res.send('Boilerplate :D'));

export default routes;
