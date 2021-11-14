// Prisma Client
import prisma from '../../../../database';

// Repository
import IUserRepository from '../IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';
import IUpdateUserProfile from '../../interfaces/IUpdateUserProfile';
import IAvatarUpload from '../../interfaces/IAvatarUpload';

class UserRepository implements IUserRepository {
  async register({
    githubId,
    name,
    email,
    password,
    bio,
    phone,
  }: IRegister) {
    const user = await prisma.user.create({
      data: {
        githubId,
        name,
        email,
        password,
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

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
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

  async updateUserProfile(userId: string, {
    name,
    email,
    password,
    bio,
    phone
  }: IUpdateUserProfile) {
    const user = await prisma.user.update({
      where: { id: userId },
      data:  {
        name,
        email,
        password,
        bio,
        phone,
      }
    });
    return user.id;
  }

  async createAvatar({ userId, avatar: { url }}: IAvatarUpload) {
    await prisma.userAvatar.create({
      data: { userId, url }
    });
  }

  async updateAvatar({ userId, avatar: { name, size, url }}: IAvatarUpload) {
    await prisma.userAvatar.update({
      where: { userId },
      data: { name, url, size },
      include: { User: true },
    });
  }
  
  async removeAvatar(userId: string) {
    await prisma.userAvatar.update({
      where: { id: userId },
      data: {
        name: 'avatar_default.jpg',
        url: 'avatar_default.jpg',
      }
    });
  }
}

export default new UserRepository();
