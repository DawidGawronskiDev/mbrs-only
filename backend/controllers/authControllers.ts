import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcryptjs";
import passport from "passport";
import createToken from "../middleware/createToken";

const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Field is required")
    .isLength({ min: 6 })
    .withMessage("Username name must contain at least 6 characters")
    .custom(async (value) => {
      const connection = await mongoose.connect(process.env.MONGO_URI!);

      const existingUsername = await User.findOne({ username: value });

      if (existingUsername) {
        connection.disconnect();
        throw new Error("User already exists with that username");
      }

      connection.disconnect();
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Field is required")
    .isEmail()
    .withMessage("Field must be type of email")
    .custom(async (value) => {
      const connection = await mongoose.connect(process.env.MONGO_URI!);

      const existingEmail = await User.findOne({ email: value });

      if (existingEmail) {
        connection.disconnect();
        throw new Error("User already exists with that email");
      }

      connection.disconnect();
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Field is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least six letters"),
];

export const signUp = [
  ...signUpValidation,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const connection = await mongoose.connect(process.env.MONGO_URI!);

    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        isMember: false,
      });

      if (!newUser) {
        res.status(400).json({ message: "Failed to create user" });
      }

      await newUser.save();

      connection.disconnect();
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      connection.disconnect();
      res.status(500).json({ message: "Internal server error" });
    }
  }),
];

const logInValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Field is required")
    .custom(async (value) => {
      const connection = await mongoose.connect(process.env.MONGO_URI!);

      const existingUsername = await User.findOne({ username: value });

      if (!existingUsername) {
        connection.disconnect();
        throw new Error("There is no user with that username");
      }

      connection.disconnect();
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Field is required")
    .custom(async (value, { req }) => {
      const connection = await mongoose.connect(process.env.MONGO_URI!);

      const existingUser = await User.findOne({ username: req.body.username });

      const isCorrect = await bcrypt.compare(value, existingUser!.password);

      if (!isCorrect) {
        connection.disconnect();
        throw new Error("Incorrect password");
      }

      connection.disconnect();
    }),
];

export const SignIn = [
  ...logInValidation,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    next();
  }),
  passport.authenticate("local"),
  createToken,
  (req: Request & { token?: string }, res: Response) => {
    const user = req.user as IUser;
    const token = req.token;

    try {
      if (!user) {
        throw new Error();
      }

      if (!token) {
        throw new Error();
      }

      const userData = {
        username: user.username,
        email: user.email,
      };

      res.status(200).json({ user: userData, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
