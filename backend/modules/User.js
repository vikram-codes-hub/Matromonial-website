import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  age: Number,
  gender: String,
  religion: String,
  caste: String,
  profession: String,
  city: String,
  education: String,
  income: String,
  bio: String,

  profileImage: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },

  // Admin controls
  isApproved: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  disapprovalMessage: {
  type: String,
  default: "",
},
notifications: [
  {
    type: { type: String }, // e.g., "like"
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }
],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
