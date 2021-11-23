export default interface IAvatarUpload {
  userID: number;
  avatar?: {
    name?: string,
    size?: number,
    url?: string
  }
}
