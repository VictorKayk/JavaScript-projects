// Interfaces
import ICreateChannel from "../interfaces/ICreateChannel";

export default interface IChannelRepository {
  createChannel({ userID, name, description }: ICreateChannel);
}
