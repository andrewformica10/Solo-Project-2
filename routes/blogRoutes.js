import express from 'express';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

//Get all blogs
router.get('/', blogController.getAllBlogs);

//Get blog by ID
router.get('/:id', blogController.getBlogById);

//Create new blog post
router.post('/', blogController.createBlogPost);

//Like a blog post
router.put('/like/:id', blogController.likeBlogPost);

//Adding a comment
router.post('/:id/comment/', blogController.addBlogComment);

//Liking a comment
router.put('/:id/comment/like/:commentIndex', blogController.likeBlogComment);

//Delete a blog post
router.delete('/:id', blogController.deleteBlogPost);

export default router;