import httpStatus from 'http-status';
import passport from 'passport';
import { APIError } from "../utils/APIError";

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  try {
    if (error || !user) {
      throw error;
    }
  } catch (e) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

export const authorize = () => (req, res, next) => {
  const strategy = 'jwt';
  const options = { session: false };
  const callback = handleJWT(req, res, next);
  passport.authenticate(strategy, options, callback)(req, res, next);
}

