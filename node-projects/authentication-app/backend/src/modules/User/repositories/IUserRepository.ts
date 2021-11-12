// Interfaces
import IEditUserProfile from '../interfaces/IEditUserProfile';
import IRegister from '../interfaces/IRegister';

export default interface IUserRepository {
  register(user: IRegister);
  emailExists(email: string);
  phoneExists(phone: string);
  getUserByEmail(email: string);
  getUserByPhone(phone: string);
  getUserByGithubId(githubId: number);
  githubIdExists(githubId: number);
  userProfile(userId: string);
  editUserProfile(userId: string, user: IEditUserProfile);
}
