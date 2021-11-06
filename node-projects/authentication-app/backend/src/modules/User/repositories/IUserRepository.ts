// Interfaces
import IRegister from '../interfaces/IRegister';

export default interface IUserRepository {
  register(user: IRegister);
}
