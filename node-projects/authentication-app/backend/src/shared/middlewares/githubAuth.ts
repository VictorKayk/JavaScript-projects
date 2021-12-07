import passport from 'passport';

export const githubLoginAuth = passport.authenticate('github', { session: false, scope: ['user:email'] });
export const githubLoginAuthCb = passport.authenticate('github', { session: false });
