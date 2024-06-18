import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Message, { IMessage } from "../models/messageModel";
import mongoose from "mongoose";
import { IToken } from "../interfaces/token";
import User from "../models/userModel";

export const getMessages = asyncHandler(
  async (
    req: Request & { token?: IToken },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI!);

      const userId = req.token?.userId;
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        res.status(400).json({ message: "User does not exists" });
        return;
      }

      const messages = await Message.find({});

      if (!messages) {
        res.status(400).json({ message: "Failed to fetch messagess" });
        return;
      }

      let encryptedMessages: IMessage[] = [];
      if (!existingUser.isMember) {
        encryptedMessages = messages.map((message: IMessage) => {
          const encryptedMessage = message;
          encryptedMessage.content = "Become a member to see message";

          return encryptedMessage;
        });
      }

      res.status(200).json({
        messages: existingUser.isMember ? messages : encryptedMessages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

const createMessageValidation = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message must not be empty")
    .isLength({ max: 250 })
    .withMessage("Message must be less then 250 characters"),
];

export const createMessage = [
  ...createMessageValidation,
  asyncHandler(
    async (
      req: Request & { token?: IToken },
      res: Response,
      next: NextFunction
    ) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { message } = req.body;
      const token = req.token;

      try {
        const connection = await mongoose.connect(process.env.MONGO_URI!);

        const newMessage = await Message.create({
          content: message,
          author: token!.userId,
        });

        if (!newMessage) {
          throw new Error();
        }

        await newMessage.save();

        connection.disconnect();

        res.status(200).json({ message: "Message created successfully" });
        return;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
    }
  ),
];
