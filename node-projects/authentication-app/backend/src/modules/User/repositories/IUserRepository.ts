// Interfaces
import IUpdateUserProfile from '../interfaces/IUpdateUserProfile';
import IRegister from '../interfaces/IRegister';

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
  updateAvatar(userId: string, avatar: string);
  removeAvatar(userId: string);
}
