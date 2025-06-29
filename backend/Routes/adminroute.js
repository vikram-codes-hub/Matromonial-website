import express from 'express';
import {adminlogin,approveProfile,checkAdminAuth,disapproveProfile,getAllUsers,getProfileById,getUnapprovedProfiles} from '../Controller/Admincontroller.js'; 

import { adminloggedin } from '../middelwares/adminmiddelware.js';

const adminRouter = express.Router();

// Routes
adminRouter.post('/adminlogin', adminlogin);
adminRouter.get('/getallusers', adminloggedin, getAllUsers);
adminRouter.get('/checkauth',adminloggedin,checkAdminAuth)
adminRouter.put('/disapproveprofile/:id', adminloggedin, disapproveProfile);  
adminRouter.put('/approveprofile/:id', adminloggedin, approveProfile);      
adminRouter.get('/getunapprovedprofiles', adminloggedin, getUnapprovedProfiles);
adminRouter.get('/getProfile/:id',adminloggedin, getProfileById);


export default adminRouter;
