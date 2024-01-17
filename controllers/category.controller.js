import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import CategoryModel from "../models/category.model.js";

// create category
export const createCategory = CatchAsyncError(async(req, res, next) => {
    try{
        const {title, description, cover} = req.body;
        const isTitleExist = await CategoryModel.findOne({title});
        if(isTitleExist) {
            return next(new ErrorHandler('Title already exist!', 400))
        }
        const category = await CategoryModel.create({title, description, cover});
        res.status(201).json({
            success: true,
            category,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// update category
export const updateCategory = CatchAsyncError(async(req, res, next) => {
    try{
        const data = req.body;
        const categoryId = req.params.id;
        const category = await CategoryModel.findByIdAndUpdate(categoryId, 
            {$set: data},
            {new: true},
        );
        res.status(201).json({
            success: true,
            category,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// get all categories
export const getAllCategories = CatchAsyncError(async(req, res, next) => {
    try {
        const categories = await CategoryModel.find().sort({createdAt: -1});
        res.status(201).json({
            success: true,
            categories,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// delete category
export const deleteCategory = CatchAsyncError(async(req, res, next) => {
    try{
        const {id} = req.params;
        const category = await CategoryModel.findById(id);
        if(!category) {
            return next(new ErrorHandler("Category not found", 404));
        }
    
        await category.deleteOne({id});
    
        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });  
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})
