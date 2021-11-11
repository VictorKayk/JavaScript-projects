import axios from 'axios';
import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Errors
import GithubLoginError from '../../../../errors/userErrors/GithubLoginError';

export default class GithubLoginUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(code) {
    const url = 'https://github.com/login/oauth/access_token';

    try {
      const { data: IAccessTokenResponse } = await axios
        .post(url, null, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        })
        .catch((e) => {
          throw new GithubLoginError(['Github token invalid.']);
        });

      const res = await axios
        .get('https://api.github.com/user', {
          headers: {
            authorization: `Bearer ${IAccessTokenResponse.access_token}`,
          },
        })
        .catch((e) => {
          throw new GithubLoginError(['Github token invalid.']);
        });

      const { name, email, id, avatar_url, bio } = res.data;

      const githubIdExists = await this.UserRepository.githubIdExists(id);
      if (githubIdExists)
        throw new GithubLoginError(['Account already exists.']);

      const userId = await this.UserRepository.register({
        githubId: id,
        name,
        email,
        bio,
        avatar: avatar_url,
      });

      const token = sign({}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        subject: `${userId}`,
      });

      return token;
    } catch (e) {
      throw new GithubLoginError([e.message], e.statusCode);
    }
  }
}
