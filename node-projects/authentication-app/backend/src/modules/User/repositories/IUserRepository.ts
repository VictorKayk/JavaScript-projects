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
  userProfile(userId: string);
  updateUserProfile(userId: string, user: IUpdateUserProfile);
  createAvatar({ userId, avatar: { url }}: IAvatarUpload);
  updateAvatar({ userId, avatar: { name, size, url }}: IAvatarUpload);
  removeAvatar(userId: string);
}
