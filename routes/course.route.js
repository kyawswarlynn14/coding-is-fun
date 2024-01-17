import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { createCourse, deleteCourse, getAllCourses, getAllCoursesByCategoryId, getOneCourse, updateCourse } from '../controllers/course.controller.js';

const courseRouter = express.Router();

courseRouter.post('/create-course', isAuthenticated, authorizeRoles([1]), createCourse);

courseRouter.patch('/update-course/:id', isAuthenticated, authorizeRoles([1]), updateCourse);

courseRouter.delete('/delete-course/:id', isAuthenticated, authorizeRoles([1]), deleteCourse);

courseRouter.get('/get-one-course/:id', isAuthenticated, getOneCourse);

courseRouter.get('/get-all-courses', isAuthenticated, getAllCourses);

courseRouter.get('/get-all-courses-by-categoryId/:id', isAuthenticated, getAllCoursesByCategoryId);

export default courseRouter;