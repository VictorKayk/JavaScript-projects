// Prisma Client
import prisma from '../../../../database';

// Repository
import IUserRepository from '../IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';
import IUpdateUserProfile from '../../interfaces/IUpdateUserProfile';
import IAvatarUpload from '../../interfaces/IAvatarUpload';
import IPermission from '../../../Permissions/interfaces/IPermission';

class UserRepository implements IUserRepository {
  async getUserRoles(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });
    return `${user.role}`;
  }

  async register({
    githubId,
    googleId,
    name,
    email,
    password,
    bio,
    phone,
  }: IRegister) {
    const user = await prisma.user.create({
      data: {
        githubId,
        googleId,
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

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        permissions: {
          select: {
            name: true,
          },
        },
      },
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await prisma.user.findUnique({
      where: { phone },
    });
    return user;
  }

  async getUserByGithubId(githubId: number) {
    const user = await prisma.user.findUnique({
      where: { githubId },
    });
    return user;
  }

  async getUserByGoogleId(googleId: number) {
    const user = await prisma.user.findUnique({
      where: { googleId },
    });
    return user;
  }

  async githubIdExists(githubId: number) {
    const githubIdExists = await prisma.user.findUnique({
      where: { githubId },
    });
    return !!githubIdExists;
  }

  async googleIdExists(googleId: number) {
    const googleIdExists = await prisma.user.findUnique({
      where: { googleId },
    });
    return !!googleIdExists;
  }

  async userExists(userID: number) {
    const userExists = await prisma.user.findUnique({
      where: { id: userID },
    });
    return !!userExists;
  }

  async getAll() {
    const users = await prisma.user.findMany({
      where: {
        role: 'user',
      },
      select: {
        id: true,
        name: true,
        avatar: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        role: true,
      },
    });
    return users;
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
          },
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
    phone,
  }: IUpdateUserProfile) {
    const user = await prisma.user.update({
      where: { id: userID },
      data: {
        name,
        email,
        password,
        bio,
        phone,
      },
    });
    return user.id;
  }

  async createAvatar(userID, { avatar: { url } }: IAvatarUpload) {
    await prisma.avatar.create({
      data: { userID, url },
    });
  }

  async updateAvatar(userID, { avatar: { name, size, url } }: IAvatarUpload) {
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
      },
    });
  }

  async getAvatarByUserID(userID: number) {
    const avatar = await prisma.avatar.findUnique({
      where: { userID },
    });
    return avatar;
  }

  async readAllModerators() {
    const moderators = await prisma.user.findMany({
      where: {
        role: 'moderator',
      },
      select: {
        id: true,
        name: true,
        avatar: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        role: true,
      },
    });
    return moderators;
  }

  async addModerator(userID: number) {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        role: 'moderator',
      },
    });
  }

  async removeModerator(userID: number) {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        role: 'user',
      },
    });
  }

  async readAllAdmins() {
    const admins = await prisma.user.findMany({
      where: {
        role: 'admin',
      },
      select: {
        id: true,
        name: true,
        avatar: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        role: true,
      },
    });
    return admins;
  }
}

export default new UserRepository();
