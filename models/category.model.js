import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema ({
    title:{
        type: String,
        required: [true, "Please enter category title"],
    },
    description:{
        type: String,
    },
    cover: {
        type: String
    },

}, {timestamps: true});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;