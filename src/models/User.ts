// src/models/User.ts
import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
