// Interfaces
import IRegister from '../interfaces/IRegister';

export default interface IUserRepository {
  register(user: IRegister);
  emailExists(email: string);
  phoneExists(phone: string);
  getUserByEmail(email: string);
  githubIdExists(githubId: number);
}