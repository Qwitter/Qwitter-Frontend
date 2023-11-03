import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: VITE_GOOGLE_CLIENT_ID,
      clientSecret: VITE_GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
