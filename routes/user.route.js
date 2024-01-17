import express from 'express';
import { deleteUser, getAllUsers, getUserInfo, loginUser, registrationUser, updatePassword, updateUserInfo, updateUserProfile, updateUserRole } from '../controllers/user.controller.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registrationUser);

userRouter.post('/login', loginUser);

userRouter.get('/me', isAuthenticated, getUserInfo);

userRouter.patch('/update-user-info', isAuthenticated, updateUserInfo);

userRouter.patch('/update-user-profile', isAuthenticated, updateUserProfile);

userRouter.patch('/update-user-password', isAuthenticated, updatePassword);

userRouter.get('/get-users', isAuthenticated, authorizeRoles([1]), getAllUsers);

userRouter.patch('/update-user-role', isAuthenticated, authorizeRoles([1]), updateUserRole);

userRouter.delete('/delete-user/:id', isAuthenticated, authorizeRoles([1]), deleteUser);

export default userRouter;