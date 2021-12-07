declare namespace Express {
  export interface Request {
    user: {
      id: number;
      role: string;
      permissions: Permissions[];
      _json?: {
        name: string,
        email: string,
        picture: string,
        avatar_url: string,
        bio: string,
      }
    };
  }
}
