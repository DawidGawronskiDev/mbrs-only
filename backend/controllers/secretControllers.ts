import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import { IToken } from "../interfaces/token";

const postKeyValidation = [
  body("key")
    .trim()
    .notEmpty()
    .withMessage("Key field must be filled")
    .custom(async (value) => {
      if (value !== "mbrs") {
        throw new Error("Wrong key");
      }
    })
    .custom(async (value, { req }) => {
      const connection = await mongoose.connect(process.env.MONGO_URI!);
      const userId = req.token!.userId;

      const existingUser = await User.findById(userId);

      connection.disconnect();

      if (existingUser && existingUser.isMember) {
        throw new Error("You are already a member");
      }
    }),
];

export const postKey = [
  ...postKeyValidation,
  asyncHandler(
    async (
      req: Request & { token?: IToken },
      res: Response,
      next: NextFunction
    ) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const userId = req.token!.userId;

        const connection = await mongoose.connect(process.env.MONGO_URI!);

        const existingUser = await User.findById(userId);

        if (!existingUser) {
          res.status(400).json({ message: "User does not exists" });
          return;
        }

        await User.findByIdAndUpdate(userId, { isMember: true });

        connection.disconnect();

        res.status(200).json({ message: "You are a member" });
        return;
        return;
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
    }
  ),
];
