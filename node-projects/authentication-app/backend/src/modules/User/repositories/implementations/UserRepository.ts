// Prisma Client
import prisma from '../../../../database';

// Repository
import IUserRepository from '../IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';

class UserRepository implements IUserRepository {
  async register(user: IRegister) {
    console.log(user);
  }
}

export default new UserRepository();
