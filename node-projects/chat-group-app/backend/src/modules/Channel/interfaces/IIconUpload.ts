export default interface IIconUpload {
  channelID: number;
  icon?: {
    name?: string,
    size?: number,
    url?: string
  }
}
