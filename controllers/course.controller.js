import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import CourseModel from "../models/course.model.js";

// create course
export const createCourse = CatchAsyncError(async(req, res, next) => {
    try{
        const data = req.body;
        const {title} = data;

        const isTitleExist = await CourseModel.findOne({title});
        if(isTitleExist) {
            return next(new ErrorHandler('Title already exist!', 400))
        }

        const course = await CourseModel.create(data);

        res.status(201).json({
            success: true,
            course,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// update course
export const updateCourse = CatchAsyncError(async(req, res, next) => {
    try{
        const data = req.body;
        const courseId = req.params.id;

        const isCourseExist = await CourseModel.findById(courseId);
        if(!isCourseExist) {
            return next(new ErrorHandler('Course not found', 404));
        }

        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, 
            {$set: data},
            {new: true},
        );
        res.status(201).json({
            success: true,
            updatedCourse,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// get all courses
export const getAllCourses = CatchAsyncError(async(req, res, next) => {
    try {
        const courses = await CourseModel.find().populate({
            path: 'category',
            model: 'Category'
        }).sort({createdAt: -1});

        res.status(201).json({
            success: true,
            courses,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// get all courses by categoryId
export const getAllCoursesByCategoryId = CatchAsyncError(async(req, res, next) => {
    try {
        const categoryId = req.params.id;
        const courses = await CourseModel.find({
            category: categoryId
        })
        .populate({
            path: 'category',
            model: 'Category'
        })
        .sort({createdAt: -1});

        res.status(201).json({
            success: true,
            courses,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// get one course
export const getOneCourse = CatchAsyncError(async(req, res, next) => {
    try {
        const {id} = req.params;

        const course = await CourseModel.findById(id);
        if(!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        res.status(201).json({
            success: true,
            course,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// delete course
export const deleteCourse = CatchAsyncError(async(req, res, next) => {
    try{
        const {id} = req.params;
        const course = await CourseModel.findById(id);
        if(!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
    
        await course.deleteOne({id});
    
        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });  
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})
