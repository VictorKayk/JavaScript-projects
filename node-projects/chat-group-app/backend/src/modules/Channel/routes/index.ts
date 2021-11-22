import multer from 'multer';
import { Router } from 'express';

// Config
import uploadConfig from '../../../configs/upload';

// Middlewares
import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

// Controllers
import getAllChannels from '../useCases/getAllChannels';
import get10Channels from '../useCases/get10Channels';
import getChannel from '../useCases/getChannel';
import createChannel from '../useCases/createChannel';
import deleteChannel from '../useCases/deleteChannel';
import iconUpload from '../useCases/iconUpload';
import iconUploadUrl from '../useCases/iconUploadUrl';
import removeIcon from '../useCases/removeIcon';
import removeMember from '../useCases/removeMember';
import addAdmin from '../useCases/addAdmin';
import removeAdmin from '../useCases/removeAdmin';
import exitChannel from '../useCases/exitChannel'
import sendMessage from '../useCases/sendMessage'


const routes = Router();

// Upload
const upload = multer(uploadConfig.upload('./tmp/uploads/icons'));

// Channel routes
// GET - Get all channels
routes.get('/', ensureAuthenticated.handle, (req, res) => getAllChannels.handle(req, res));
// GET - Get 10 channels
routes.get('/10channels', ensureAuthenticated.handle, (req, res) => get10Channels.handle(req, res));
// GET - Specific channel
routes.get('/:channelID', ensureAuthenticated.handle, (req, res) => getChannel.handle(req, res));
// POST
routes.post('/', ensureAuthenticated.handle, (req, res) => createChannel.handle(req, res));
// DELETE
routes.delete('/:channelID', ensureAuthenticated.handle, (req, res) => deleteChannel.handle(req, res))


// Channel icon routes
// POST - Upload icon
routes.post('/icon/:channelID', ensureAuthenticated.handle, upload.single('icon'), (req, res) => iconUpload.handle(req, res));
// POST - Upload icon url
routes.post('/icon/url/:channelID', ensureAuthenticated.handle, (req, res) => iconUploadUrl.handle(req, res));
// DELETE - Remove icon
routes.delete('/icon/:channelID', ensureAuthenticated.handle, (req, res) => removeIcon.handle(req, res));

// Members routes
// The member is created when get the channel content
// DELETE - Exiting the channel
routes.delete('/:channelID/members', ensureAuthenticated.handle, (req, res) => exitChannel.handle(req, res));
// DELETE - remove member
routes.delete('/:channelID/members/:memberID', ensureAuthenticated.handle, (req, res) => removeMember.handle(req, res))

// Admins routes
// POST - add admins
routes.post('/:channelID/admins/:adminID', ensureAuthenticated.handle, (req, res) => addAdmin.handle(req, res));
// DELETE - Exiting the channel
routes.delete('/:channelID/admins', ensureAuthenticated.handle, (req, res) => exitChannel.handle(req, res));
// DELETE - remove admins
routes.delete('/:channelID/admins/:adminID', ensureAuthenticated.handle, (req, res) => removeAdmin.handle(req, res));

// Message routes
// POST - send message
routes.post('/:channelID/message', ensureAuthenticated.handle, (req, res) => sendMessage.handle(req, res));


export default routes;