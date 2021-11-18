// Interfaces
import ICreateChannel from "../interfaces/ICreateChannel";
import IIconUpload from "../interfaces/IIconUpload";

export default interface IChannelRepository {
  createChannel({ userID, name, description }: ICreateChannel);
  createChannelIcon({ channelID, icon: { name, size, url }}: IIconUpload);
  IsChannelAdmin(userID: number, channelID: number);
  getIconByChannelID(channelID: number);
  updateIcon({ channelID, icon: { name, size, url }}: IIconUpload);
  removeIcon(channelID: number);
}
