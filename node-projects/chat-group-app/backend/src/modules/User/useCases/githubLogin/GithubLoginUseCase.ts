import axios from 'axios';
import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Errors
import GithubLoginError from '../../errors/GithubLoginError';

export default class GithubLoginUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async accessToken(url, code) {
    try {
      const accessToken = await axios
        .post(url, null, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        });
        return accessToken;
    } catch(e) {
      throw new GithubLoginError(['Github token invalid.']);
    }
  }

  async githubData(accessToken) {
    try {
      const data = await axios
      .get('https://api.github.com/user', {
        headers: {
          authorization: `Bearer ${accessToken.access_token}`,
        },
      });
      return data;
    } catch(e) {
      throw new GithubLoginError(['Github token invalid.']);
    }
  }

  getToken(userID) {
    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: `${userID}`,
    });
    return token;
  }

  async execute(code) {
    let userID;
    const url = 'https://github.com/login/oauth/access_token';
    try {
      const { data: IAccessTokenResponse } = await this.accessToken(url, code)

      const res =  await this.githubData(IAccessTokenResponse);
      const { name, email, id, avatar_url, bio } = res.data;

      const githubIdExists = await this.UserRepository.githubIdExists(id);
      if (githubIdExists) {
        userID = await this.UserRepository.getUserByGithubId(id);
      } else {
        userID = await this.UserRepository.register({
          githubId: id,
          name,
          email,
          bio,
        });
        
        await this.UserRepository.createAvatar({ userID, avatar: { url: avatar_url }});
      }

      const token = this.getToken(userID);
      return token;
    } catch (e) {
      throw new GithubLoginError([e.message], e.statusCode);
    }
  }
}
