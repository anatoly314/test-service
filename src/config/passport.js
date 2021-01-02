import PassportJwt from 'passport-jwt';
const { Strategy, ExtractJwt } = PassportJwt;

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    //TODO add function which transforms payload to user
    const user = payload;
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtStrategy = new Strategy(jwtOptions, jwt);
