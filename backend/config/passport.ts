import passport = require("passport");
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

import User from "../models/userModel";
import mongoose from "mongoose";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordCorrect = bcrypt.compare(
        password,
        user.password as string
      );
      if (!isPasswordCorrect) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
