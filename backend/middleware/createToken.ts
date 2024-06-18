import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const createToken = asyncHandler(
  async (
    req: Request & { token?: string },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;

    try {
      if (!user) {
        throw new Error();
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1 day",
      });

      if (!token) {
        throw new Error();
      }

      req.token = token;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default createToken;
