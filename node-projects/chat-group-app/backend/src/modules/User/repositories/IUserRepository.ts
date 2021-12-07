/* eslint-disable semi */
// Interfaces
import IUpdateUserProfile from '../interfaces/IUpdateUserProfile';
import IRegister from '../interfaces/IRegister';
import IAvatarUpload from '../interfaces/IAvatarUpload';

export default interface IUserRepository {
  getUserRoles(id: number);
  register(user: IRegister);
  emailExists(email: string);
  phoneExists(phone: string);
  getUserById(id: number);
  getUserByEmail(email: string);
  getUserByPhone(phone: string);
  getUserByGithubId(githubId: number);
  getUserByGoogleId(googleId: number);
  githubIdExists(githubId: number);
  googleIdExists(googleId: number);
  userExists(userID: number);
  getAll();
  userProfile(userID: number);
  updateUserProfile(userID: number, user: IUpdateUserProfile);
  createAvatar(userID, { avatar: { url } }: IAvatarUpload);
  updateAvatar(userID, { avatar: { name, size, url } }: IAvatarUpload);
  removeAvatar(userID: number);
  getAvatarByUserID(userID: number);
  readAllModerators();
  addModerator(userID: number);
  removeModerator(userID: number);
  readAllAdmins();
}
