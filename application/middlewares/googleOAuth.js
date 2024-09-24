var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../domain/models/userModel');

module.exports = (passport)=>{
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    try {
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let userInstance = new User();
      let dataUser = [{
        $match: {
          email: profile._json.email
        }
      }];
      let resAgregate = await userInstance.aggregate(dataUser)
      let [user] = resAgregate
      if(resAgregate.length) return done(null, user);
      let data = {
        cedula: profile._json.sub,
        names:  profile._json.given_name,
        surnames:  profile._json.family_name,
        nick: "Not assigned",
        email: profile._json.email,
        phone: "123",
        role: "Usuario Estandar",
        password:"Not assigned"
      }
      await userInstance.insert(data)
      let userCreate = await userInstance.aggregate(dataUser)
      done(null, userCreate);
    } catch (error) {
      console.error('Error saving/updating user:', error);
      done(error, null);
    }
  }));
}