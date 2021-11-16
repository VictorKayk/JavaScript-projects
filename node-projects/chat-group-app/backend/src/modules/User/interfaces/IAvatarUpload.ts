export default interface IAvatarUpload {
  userID: string;
  avatar?: {
    name?: string,
    size?: number,
    url?: string
  }
}
