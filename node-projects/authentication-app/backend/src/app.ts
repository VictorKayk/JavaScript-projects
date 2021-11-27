import 'dotenv';
import 'express-async-errors';
import express from 'express';
import swagger from 'swagger-ui-express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import passport from 'passport';

// Too Busy
import tooBusy from './shared/middlewares/tooBusy';

// Passport
import './configs/passportConfig'

// Swagger file
import swaggerFile from './swagger.json';

// Routes
import routes from './routes';

// Error Handling
import errorHandling from './shared/middlewares/errorHandling';

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(tooBusy);
app.use(passport.initialize());

// Allow json
app.use(express.json({ limit: '1kb' }));

// Swagger - routes docs
app.use('/docs', swagger.serve, swagger.setup(swaggerFile));

// Routes
app.use(routes);

// Default Errors
app.use(errorHandling);

export default app;
