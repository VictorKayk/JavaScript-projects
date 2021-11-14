export default interface IAvatarUpload {
  userId: string;
  avatar?: {
    name?: string,
    size?: number,
    url?: string
  }
}
