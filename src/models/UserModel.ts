import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false }
});

interface User extends mongoose.Document {
  email: string;
  password: string;
}

export default mongoose.model<User>("User", UserSchema);