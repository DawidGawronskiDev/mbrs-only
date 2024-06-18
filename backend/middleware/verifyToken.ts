import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
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
    res.status(401).send({ message: "Please authenticate" });
  }
};

export default verifyToken;
