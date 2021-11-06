import { Router } from 'express';

const routes = Router();

// Example routes
// GET
routes.get('/', (req, res) => res.send('Boilerplate :D'));
// POST
routes.post('/', (req, res) => res.send('Boilerplate :D'));
// PUT
routes.put('/', (req, res) => res.send('Boilerplate :D'));
// PATCH
routes.patch('/', (req, res) => res.send('Boilerplate :D'));
// DELETE
routes.delete('/', (req, res) => res.send('Boilerplate :D'));

export default routes;
