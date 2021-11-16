// Interfaces
import IUpdateUserProfile from '../interfaces/IUpdateUserProfile';
import IRegister from '../interfaces/IRegister';
import IAvatarUpload from '../interfaces/IAvatarUpload';

export default interface IUserRepository {
  register(user: IRegister);
  emailExists(email: string);
  phoneExists(phone: string);
  getUserById(id: string);
  getUserByEmail(email: string);
  getUserByPhone(phone: string);
  getUserByGithubId(githubId: number);
  githubIdExists(githubId: number);
  userProfile(userID: string);
  updateUserProfile(userID: string, user: IUpdateUserProfile);
  createAvatar({ userID, avatar: { url }}: IAvatarUpload);
  updateAvatar({ userID, avatar: { name, size, url }}: IAvatarUpload);
  removeAvatar(userID: string);
  getAvatarByUserID(userID: string);
}
