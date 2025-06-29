import express from 'express';
const userRouter = express.Router();
import User from '../modules/User.js'
import { checkAuth, getAllProfiles, getProfileById, likeUserProfile, login, register, updateProfile } from '../Controller/UserController.js';
import { isLoggedin } from '../middelwares/auth.js';

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get("/checkauth",isLoggedin,checkAuth)
userRouter.put('/updateProfile',isLoggedin,updateProfile)
userRouter.get('/getAllProfiles',isLoggedin,getAllProfiles)
userRouter.get('/getProfile/:id', isLoggedin, getProfileById);
userRouter.post('/likeprofile/:id',isLoggedin,likeUserProfile)
userRouter.get('/getCurrentUser', isLoggedin, async (req, res) => {
  try {
    
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});


export default userRouter;
