// Prisma Client
import prisma from '../../../../database';

// Repository
import IChannelRepository from '../IChannelRepository';

// Interfaces
import ICreateChannel from '../../interfaces/ICreateChannel';
import IIconUpload from '../../interfaces/IIconUpload';

class ChannelRepository implements IChannelRepository {
  async createChannel({ userID, name, description }: ICreateChannel) {
    const channel = await prisma.channel.create({
      data: {
        name,
        description,
        creatorID: userID,
        admins: {
          create: { userID }
        }
      }
    });
    return channel.id;
  }

  async createChannelIcon({ channelID }: IIconUpload) {
    await prisma.channelIcon.create({
      data: {
        channelID
      }
    })
  }

  async IsChannelAdmin(userID: number, channelID: number) {
    const adm = await prisma.channelOnUserAdmin.findFirst({
      where: {
        userID,
        channelID
      }
    });
    return adm;
  }

  async getIconByChannelID(channelID: number) {
    const icon = await prisma.channelIcon.findFirst({
      where: { channelID }
    });
    return icon;
  }

  async updateIcon({ channelID, icon: { name, url, size }}: IIconUpload) {
    await prisma.channelIcon.update({
      where: { channelID },
      data: {
        name,
        url,
        size
      }
    })
  }

  async removeIcon(channelID: number) {
    await prisma.channelIcon.update({
      where: { channelID },
      data: {
        name: 'Channel icon',
        url: 'channel_icon_default.jpg',
        size: 0
      }
    })
  }
}

export default new ChannelRepository()
