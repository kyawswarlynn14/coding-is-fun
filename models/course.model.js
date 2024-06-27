import mongoose, { Schema, Types } from "mongoose";

const outlineSchema = new Schema ({
    title: {type: String, required: true},
    chapters: [
        {
            title: {type: String, required: true},
            video: {type: String}
        }
    ]
})

const courseSchema = new Schema ({
    title:{
        type: String,
        required: [true, "Please enter course title"],
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, "Please enter course category"]
    },
    description:{ type: String },
    cover: { type: String },
    coverVideo: { type : String },
    paid: {
        type: Boolean,
        required: true,
        default: true
    },
    fee:{
        type: Number,
        required: [true, "Please enter fee"],
    },
    outlines: [outlineSchema]
    
}, {timestamps: true});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;