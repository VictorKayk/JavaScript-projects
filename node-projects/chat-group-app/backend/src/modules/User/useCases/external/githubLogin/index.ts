// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import GithubLoginUseCase from './GithubLoginUseCase';

// Controller
import GithubLogin from './GithubLoginController';

const githubLoginUseCase = new GithubLoginUseCase(UserRepository);
const githubLoginController = new GithubLogin(githubLoginUseCase);

export default githubLoginController;
