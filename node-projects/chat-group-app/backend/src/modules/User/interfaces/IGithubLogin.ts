export default interface IGithubLogin {
  id: number;
  name: string;
  email: string | null;
  bio: string | null;
  avatar_url: string;
};
