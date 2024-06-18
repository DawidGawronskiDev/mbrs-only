import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import session from "express-session";

import authRoutes from "./routes/authRoutes";
import mongoose from "mongoose";
import verifyToken from "./middleware/verifyToken";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!);

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/auth", authRoutes);

app.get("/test", verifyToken);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
