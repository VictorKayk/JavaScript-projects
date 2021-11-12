// Prisma Client
import prisma from '../../../../database';

// Repository
import IUserRepository from '../IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';
import IEditUserProfile from '../../interfaces/IEditUserProfile';

class UserRepository implements IUserRepository {
  async register({
    githubId,
    name,
    email,
    password,
    avatar,
    bio,
    phone,
  }: IRegister) {
    const user = await prisma.user.create({
      data: {
        githubId,
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

  async getUserByPhone(phone) {
    const user = await prisma.user.findUnique({
      where: { phone },
    });
    return user;
  }

  async getUserByGithubId(githubId) {
    const user = await prisma.user.findUnique({
      where: { githubId },
    });
    return user;
  }

  async githubIdExists(githubId: number) {
    const githubIdExists = await prisma.user.findUnique({
      where: { githubId },
    });
    return !!githubIdExists;
  }

  async userProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        bio: true,
        avatar: true,
        phone: true,
      },
    });
    return user;
  }

  async editUserProfile(userId: string, {
    name,
    email,
    password,
    avatar,
    bio,
    phone
  }: IEditUserProfile) {
    const user = await prisma.user.update({
      where: { id: userId },
      data:  {
        name,
        email,
        password,
        avatar,
        bio,
        phone,
      }
    });
    return user.id;
  }
}

export default new UserRepository();
