// Interfaces
import ICreateChannel from "../interfaces/ICreateChannel";
import IIconUpload from "../interfaces/IIconUpload";

export default interface IChannelRepository {
  createChannel({ userID, name, description }: ICreateChannel);
  createChannelIcon({ channelID, icon: { name, size, url }}: IIconUpload);
  isChannelAdmin(userID: number, channelID: number);
  isChannelMember(userID: number, channelID: number);
  isChannelCreator(userID: number, channelID: number);
  addChannelMember(userID: number, channelID: number);
  removeChannelMember(userID: number, channelID: number);
  addChannelAdmin(userID: number, channelID: number);
  removeChannelAdmin(userID: number, channelID: number);
  getChannel(channelID: number);
  getIconByChannelID(channelID: number);
  updateIcon({ channelID, icon: { name, size, url }}: IIconUpload);
  removeIcon(channelID: number);
}
