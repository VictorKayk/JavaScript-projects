// Prisma Client
import prisma from '../../../../database';

// Repository
import IChannelRepository from '../IChannelRepository';

// Interfaces
import ICreateChannel from '../../interfaces/ICreateChannel';

class ChannelRepository implements IChannelRepository {
  async createChannel({ userID, name, description }: ICreateChannel) {
    await prisma.channel.create({
      data: {
        name,
        description,
        creatorID: userID,
        admins: {
          create: { userID }
        }
      }
    })
  }
}

export default new ChannelRepository()
