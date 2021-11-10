// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import GithubLoginUseCase from './GithubLoginUseCase';

// Controller
import { GithubLogin, GithubLoginAuth } from './GithubLoginController';

const githubGithubLoginUseCase = new GithubLoginUseCase(UserRepository);
const githubLoginController = new GithubLoginAuth(githubGithubLoginUseCase);

export { GithubLogin, githubLoginController };
