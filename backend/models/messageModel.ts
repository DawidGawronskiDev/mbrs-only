import mongoose, { Schema, model } from "mongoose";

export interface IMessage extends Document {
  content: string;
  author?: string;
}

const messageSchema = new Schema<IMessage>(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model<IMessage>("Message", messageSchema);

export default Message;
