import 'dotenv';
import 'express-async-errors';
import express from 'express';
import swagger from 'swagger-ui-express';
import helmet from 'helmet';
import cors from 'cors';

// Swagger file
import swaggerFile from './swagger.json';

// Routes
import routes from './routes';

// Errors
import AppError from './shared/error/AppError';

const app = express();

// Security
app.use(helmet());
app.use(cors());

// Allow json
app.use(express.json());

// Swagger - routes docs
app.use('/docs', swagger.serve, swagger.setup(swaggerFile));

// Routes
app.use(routes);

// Default Erros
app.use((err, req, res, next) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ error: err.message });

  return res
    .status(500)
    .json({ msg: `Internal server error - ${err.message}` });
});

export default app;
