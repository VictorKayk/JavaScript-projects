import fs from 'fs'

export default async function deleteFile(path: string) {
  try {
    await fs.promises.stat(path);
    await fs.promises.unlink(path);
  } catch (e) {
    return;
  }
}