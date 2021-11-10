// Prisma Client
import prisma from '../../../../database';

// Repository
import IUserRepository from '../IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';

class UserRepository implements IUserRepository {
  async register({ name, email, password, avatar, bio, phone }: IRegister) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
        bio,
        phone,
      },
    });

    return user.id;
  }

  async emailExists(email: string) {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    return !!emailExists;
  }

  async phoneExists(phone: string) {
    const phoneExists = await prisma.user.findUnique({
      where: { phone },
    });
    return !!phoneExists;
  }

  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async githubIdExists(githubId: number) {
    const githubIdExists = await prisma.user.findUnique({
      where: { githubId },
    });
    return !!githubIdExists;
  }
}

export default new UserRepository();
