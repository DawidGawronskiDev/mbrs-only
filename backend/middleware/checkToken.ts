import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default checkToken;
