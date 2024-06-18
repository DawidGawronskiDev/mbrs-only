import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isMember: boolean;
}

declare global {
  namespace Express {
    interface User extends Document {}
  }
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isMember: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
