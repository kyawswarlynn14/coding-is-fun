import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.post('/create-category', isAuthenticated, authorizeRoles([1]), createCategory);

categoryRouter.patch('/update-category/:id', isAuthenticated, authorizeRoles([1]), updateCategory);

categoryRouter.delete('/delete-category/:id', isAuthenticated, authorizeRoles([1]), deleteCategory);

categoryRouter.get('/get-all-categories', isAuthenticated, getAllCategories);

export default categoryRouter;