import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

function getFileName(file: Express.Multer.File) {
  const hash = crypto.randomBytes(16).toString('hex');
  const randomNumber = Math.floor(Math.random() * (1000 - 1) + 1);
  const regex = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi
  const extension = file.originalname.match(regex);
  return `${hash}-${randomNumber}${extension}`
}

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (req, file, cb) => {
          const fileName = getFileName(file);
          return cb(null, fileName);
        }
      })
    }
  }
}