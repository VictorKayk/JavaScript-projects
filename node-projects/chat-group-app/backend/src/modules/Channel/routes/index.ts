import multer from 'multer';
import { Router } from 'express';

// Config
import uploadConfig from '../../../configs/upload';

// Middlewares
import auth from '../../../shared/middlewares/auth';

// Controllers
import createChannel from '../useCases/createChannel';
import iconUpload from '../useCases/iconUpload';
import iconUploadUrl from '../useCases/iconUploadUrl';
import removeIcon from '../useCases/removeIcon';

const routes = Router();

// Upload
const upload = multer(uploadConfig.upload('./tmp/uploads/icons'));

// Channel routes
// POST
routes.post('/', auth.handle, (req, res) => createChannel.handle(req, res));

// Channel icon routes
// POST - Upload icon
routes.post('/icon/:id', auth.handle, upload.single('icon'), (req, res) => iconUpload.handle(req, res));
// POST - Upload icon url
routes.post('/icon/url/:id', auth.handle, (req, res) => iconUploadUrl.handle(req, res));
// DELETE - Remove icon
routes.delete('/icon/:id', auth.handle, (req, res) => removeIcon.handle(req, res));

export default routes;
