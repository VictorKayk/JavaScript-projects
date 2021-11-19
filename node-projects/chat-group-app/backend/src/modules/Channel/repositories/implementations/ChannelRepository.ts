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

    async getChannel(channelID: number) {
    const channel = await prisma.channel.findUnique({
      where: { id: channelID },
      select: {
        id: true,
        name: true,
        description: true,
        icon: {
          select: {
            name: true,
            url: true,
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
          }
        },
        createdAt: true,
        admins: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: {
                  select: {
                    name: true,
                    url: true,
                  }
                },
                bio: true,
              }
            }
          },
          orderBy: {
            user: {
              name: 'asc'
            }
          }
        },
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: {
                  select: {
                    name: true,
                    url: true,
                  }
                },
                bio: true,
              }
            }
          },
          orderBy: {
            user: {
              name: 'asc'
            }
          }
        },
        messages: {
          select: {
            id: true,
            message: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: {
                  select: {
                    name: true,
                    url: true,
                  }
                }
              }
            },
            createdAt: true
          },
          take: 50,
          orderBy: {
            createdAt: 'asc'
          }
        },
      }
    });
    return channel;
  }

  async get10Channels() {
    const channels = await prisma.channel.findMany({
      select: {
        id: true,
        name: true,
        icon: {
          select: {
            id: true,
            name: true,
            url: true,
          }
        },
      },
      orderBy: {
        members: {
          _count: 'desc'
        }
      },
      take: 10
    });
    return channels;
  }

  async createChannelIcon({ channelID }: IIconUpload) {
    await prisma.channelIcon.create({
      data: {
        channelID
      }
    });
  }

  async isChannelAdmin(userID: number, channelID: number) {
    const adm = await prisma.channelOnUserAdmin.findUnique({
      where: {
        userID_channelID: {
          userID,
          channelID
        }
      }
    });
    return !!adm;
  }

  async isChannelMember(userID: number, channelID: number) {
    const member = await prisma.channelOnUserMember.findUnique({
      where: {
        userID_channelID: {
          userID,
          channelID
        }
      }
    });
    return !!member;
  }

  async isChannelCreator(userID: number, channelID: number) {
    const creator = await prisma.channel.findFirst({
      where: {
        id: channelID,
        creatorID: userID,
      }
    });
    return !!creator;
  }

  async addChannelMember(userID: number, channelID: number) {
    await prisma.channelOnUserMember.create({
      data: {
        userID,
        channelID
      }
    });
  }

  async removeChannelMember(userID: number, channelID: number) {
    await prisma.channelOnUserMember.delete({
      where: {
        userID_channelID: {
          userID,
          channelID
        }
      }
    });
  }
  
  async addChannelAdmin(userID: number, channelID: number) {
    await prisma.channelOnUserAdmin.create({
      data: {
        userID,
        channelID
      }
    });
  }
  
  async removeChannelAdmin(userID: number, channelID: number) {
    await prisma.channelOnUserAdmin.delete({
      where: {
        userID_channelID: {
          userID,
          channelID
        }
      }
    });
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
    });
  }

  async removeIcon(channelID: number) {
    await prisma.channelIcon.update({
      where: { channelID },
      data: {
        name: 'Channel icon',
        url: 'channel_icon_default.jpg',
        size: 0
      }
    });
  }

  async sendMessage(userID: number, channelID: number, message: string) {
    await prisma.message.create({
      data: {
        message,
        userID,
        channelID
      }
    });
  }
}

export default new ChannelRepository()
