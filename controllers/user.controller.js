import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import { sendToken } from "../utils/jwt.js";

// register user
export const registrationUser = CatchAsyncError(async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
    
        const isEmailExist = await UserModel.findOne({email});
        if(isEmailExist) {
            return next(new ErrorHandler("Email already exist", 400))
        };
    
        const user = await UserModel.create({ name, email, password });
    
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Login user
export const loginUser = CatchAsyncError(async(req, res, next) => {
    try{
        const {email, password } = req.body;
    
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        };
    
        const user = await UserModel.findOne({email}).select("+password");
    
        if(!user) {
            return next(new ErrorHandler("Invalid email or password", 400));
        };
    
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return next(new ErrorHandler("Invalid password", 400));
        };
    
        sendToken(user, 200, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// get user info
export const getUserInfo = CatchAsyncError(async(req, res, next) => {
    try{
        const userId = req.user?._id.toString();
        const user = await UserModel.findById(userId);
        res.status(201).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// update user info
export const updateUserInfo = CatchAsyncError(async(req, res, next) => {
    try{
        const {name, email} = req.body;
        const userId = req.user?._id;
        const user = await UserModel.findById(userId);
    
        if(email && user) {
            const isEmailExist = await UserModel.findOne({email});
            if(isEmailExist) {
                return next(new ErrorHandler("Email already exist", 400));
            }
            user.email = email;
        }
    
        if(name && user) {
            user.name = name;
        }
    
        await user?.save();
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// update user profile
export const updateUserProfile = CatchAsyncError(async(req, res, next) => {
    try{
        const {avatar} = req.body;
        const userId = req.user?._id;
        const user = await UserModel.findById(userId);
    
        if(user) {
            user.avatar = avatar;
        }
    
        const newUser = await user?.save();
        res.status(201).json({
            success: true,
            newUser,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// update user password
export const updatePassword = CatchAsyncError(async(req, res, next) => {
    try{
        const {oldPassword, newPassword} = req.body;
    
        if(!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please enter old and new password", 400));
        }
    
        const user = await UserModel.findById(req.user?._id).select('+password');
        if(user?.password === undefined) {
            return next(new ErrorHandler("Invalid user", 400));
        }
        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if(!isPasswordMatch) {
            return next(new ErrorHandler("Invalid old password", 400));
        }
        user.password = newPassword;
    
        await user.save();
    
        res.status(201).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// get all users only admin
export const getAllUsers = CatchAsyncError(async(req, res, next) => {
    try{
        const users = await UserModel.find().sort({createdAt: -1});
        res.status(201).json({
            success: true,
            users,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// update user role only admin
export const updateUserRole = CatchAsyncError(async(req, res, next) => {
    try{
        const {id, role} = req.body;
        const user = await UserModel.findByIdAndUpdate(id, {role}, {new: true});
        
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// delete user only admin
export const deleteUser = CatchAsyncError(async(req, res, next) => {
    try{
        const {id} = req.params;
        const user = await UserModel.findById(id);
        if(!user) {
            return next(new ErrorHandler("User not found", 404));
        }
    
        await user.deleteOne({id});
    
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });  
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})
