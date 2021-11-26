// Interfaces
import IUpdateUserProfile from '../interfaces/IUpdateUserProfile';
import IRegister from '../interfaces/IRegister';
import IAvatarUpload from '../interfaces/IAvatarUpload';

export default interface IUserRepository {
  register(user: IRegister);
  emailExists(email: string);
  phoneExists(phone: string);
  getUserById(id: number);
  getUserByEmail(email: string);
  getUserByPhone(phone: string);
  getUserByGithubId(githubId: number);
  githubIdExists(githubId: number);
  userProfile(userID: number);
  updateUserProfile(userID: number, user: IUpdateUserProfile);
  createAvatar(userID, { avatar: { url }}: IAvatarUpload);
  updateAvatar(userID, { avatar: { name, size, url }}: IAvatarUpload);
  removeAvatar(userID: number);
  getAvatarByUserID(userID: number);
}
