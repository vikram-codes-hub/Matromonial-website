import bcrypt from "bcrypt";
import User from '../modules/User.js'
import jwt from "jsonwebtoken";
import validator from "validator";
import cloudinary from "../config/Cloudinary.js";

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, mssg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, mssg: "Invalid credentials" });
    }

    const token = createToken({ id: user._id });

    res.json({
      success: true,
      token,

      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, mssg: error.message });
  }
};

export default login;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, mssg: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, mssg: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, mssg: "Please enter strong password" });
    }
    //hasing pass

    const saltrounds = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, saltrounds);

    const newuser = new User({
      name,
      email,
      password: hashedpass,
    });
    const user = await newuser.save();
    const token = createToken({ id: user._id }); 

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      mssg: error.message,
    });
  }
};

export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

//to update user profile
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      gender,
      religion,
      caste,
      profession,
      city,
      education,
      income,
      bio,
      profileImage,
      images,
    } = req.body;

    const userId = req.user._id;
    let updatedUser;

    if (!profileImage) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          age,
          gender,
          religion,
          caste,
          profession,
          city,
          education,
          income,
          bio,
        },
        { new: true }
      );

      return res.json({ success: true, user: updatedUser });
    } else {
      const upload = await cloudinary.uploader.upload(profileImage);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          age,
          gender,
          religion,
          caste,
          profession,
          city,
          education,
          income,
          bio,
          profileImage: upload.secure_url,
        },
        { new: true }
      );

      return res.json({ success: true, user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, mssg: error.message });
  }
};



//get all the profiles
export const getAllProfiles = async (req, res) => {
    try {
      const profiles=await User.find({})
     res.json({ success: true, profiles});
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, mssg: error.message });
  }
};


export const getProfileById = async (req, res) => {
    try {
        const profileId = req.params.id;
        const profile = await User.findById(profileId);
     if (!profile) {
      return res.status(404).json({ success: false, mssg: "Profile not found" });
    }
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mssg: error.message });
  }
};



export const likeUserProfile = async (req, res) => {
  try {
    const likedUserId = req.params.id;
   const currentUserId = req.userId;


    if (likedUserId === currentUserId) {
      return res.status(400).json({ success: false, mssg: "You cannot like your own profile" });
    }

    const likedUser = await User.findById(likedUserId);
    const fromUser = await User.findById(currentUserId);
   

    if (!likedUser || !fromUser) {
      return res.status(404).json({ success: false, mssg: "User not found" });
    }

    const notification = {
      type: "like",
      fromUser: currentUserId,
        message: `${fromUser.name} liked your profile photo.`,
    };

    likedUser.notifications.unshift(notification);
    console.log("Notifications before save:", likedUser.notifications);

    await likedUser.save();

    res.json({ success: true, mssg: "Liked and notification sent" });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ success: false, mssg: error.message });
  }
};