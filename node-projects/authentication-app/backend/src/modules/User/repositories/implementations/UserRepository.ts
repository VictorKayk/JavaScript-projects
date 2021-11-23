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

  async userProfile(userID: number) {
    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        name: true,
        email: true,
        bio: true,
        phone: true,
        avatar: {
          select: {
            name: true,
            url: true,
            size: true,
          }
        },
      },
    });
    return user;
  }

  async updateUserProfile(userID: number, {
    name,
    email,
    password,
    bio,
    phone
  }: IUpdateUserProfile) {
    const user = await prisma.user.update({
      where: { id: userID },
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

  async createAvatar({ userID, avatar: { url }}: IAvatarUpload) {
    await prisma.avatar.create({
      data: { userID, url }
    });
  }

  async updateAvatar({ userID, avatar: { name, size, url }}: IAvatarUpload) {
    await prisma.avatar.update({
      where: { userID },
      data: { name, url, size },
    });
  }
  
  async removeAvatar(userID: number) {
    await prisma.avatar.update({
      where: { userID },
      data: {
        name: 'Profile picture',
        url: 'avatar_default.jpg',
        size: 0,
      }
    });
  }

  async getAvatarByUserID(userID: number) {
    const avatar = await prisma.avatar.findUnique({
      where: { userID },
    });
    return avatar;
  }
}

export default new UserRepository();
