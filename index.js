import express from 'express';
import cors from "cors";
import {ErrorMiddleware} from './middleware/error.js';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import courseRouter from './routes/course.route.js';

export const app = express();
app.use(express.json({limit: "50mb"}));
app.use(cors({origin: "*"}));

app.use("/api/v1", userRouter, categoryRouter, courseRouter);

app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});

app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is connected with port ${process.env.PORT || 8000}`);
    connectDB();
})

app.use(ErrorMiddleware);