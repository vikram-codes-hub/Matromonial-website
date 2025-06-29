import jwt from 'jsonwebtoken';
import User from '../modules/User.js'
const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Compare with .env credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken({ isAdmin: true });

      return res.json({
        success: true,
        token,
        isAdmin: true,
        mssg: "Admin login successful",
      });
    } else {
      return res.json({ success: false, mssg: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.json({ success: false, mssg: error.message });
  }
};
// route: /api/admin/checkauth
export const checkAdminAuth = (req, res) => {
  try {
    const tokenData = req.user; // from middleware
    if (tokenData.isAdmin) {
      return res.json({ success: true, isAdmin: true });
    }
    res.json({ success: false });
  } catch (err) {
    res.json({ success: false });
  }
};

//get profile by id
export const getProfileById=async(req,res)=>{
  try {
     const { id } = req.params;
    const profile = await User.findById(id);
     if (!profile) {
      return res.status(404).json({ success: false, msg: 'Profile not found' });
    }

    return res.json({ success: true, profile });
  }  catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

 // Admin approves a user
export const approveProfile = async (req, res) => {
  try {
    const profileId = req.params.id;

    const user = await User.findByIdAndUpdate(
      profileId,
      { isApproved: true ,disapprovalMessage: ""  },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, mssg: "Profile not found" });
    }

    res.json({ success: true, mssg: "Profile approved", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mssg: error.message });
  }
};


export const disapproveProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const { message } = req.body;

    const profile = await User.findByIdAndUpdate(
      profileId,
      { 
        isApproved: false, 
        disapprovalMessage: message || "Your profile has been disapproved."
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ success: false, mssg: "Profile not found" });
    }

    res.json({ success: true, mssg: "Profile disapproved", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mssg: error.message });
  }
};

export const getUnapprovedProfiles = async (req, res) => {
  try {
    const profiles = await User.find({ isApproved: false });
    res.json({ success: true, profiles });
  } catch (error) {
    res.status(500).json({ success: false, mssg: error.message });
  }
};

// GET /admin/all-users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, mssg: error.message });
  }
};

