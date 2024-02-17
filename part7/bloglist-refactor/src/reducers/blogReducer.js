import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogAction(_state, action) {
            return action.payload;
        },
        appendBlogAction(state, action) {
            return state.concat(action.payload);
        },
        likeBlogAction(state, action) {
            const likedBlog = action.payload;
            return state.map((blog) =>
                blog.id === likedBlog.id ? likedBlog : blog,
            );
        },
        deleteBlogAction(state, action) {
            const delId = action.payload;
            return state.filter((blog) => blog.id !== delId);
        },
    },
});

const { setBlogAction, appendBlogAction, likeBlogAction, deleteBlogAction } =
    blogSlice.actions;

/**
 * Initializes the list of blogs by fetching them from the server.
 * Use this function when starting the application or refreshing the list of blogs.
 *
 * @returns {Promise<void>} A Promise that resolves once the initialization is complete.
 */
export const initBlog = () => {
    return async (dispatch) => {
        const fetchedBlogs = await blogService.getAll();
        dispatch(setBlogAction(fetchedBlogs));
    };
};

/**
 * Adds a new blog to the current list of blogs.
 *
 * @param {object} newBlogObject The blog object to be added. Should contain all properties of the new blog.
 * @returns {Promise<void>} A Promise that resolves once the blog is successfully added.
 */
export const appendBlog = (newBlogObject) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(newBlogObject);

        dispatch(appendBlogAction(newBlog));
    };
};

/**
 * Likes a blog by updating its number of likes.
 *
 * @param {object} likedBlog The blog object to be liked. Should contain all properties of the liked blog.
 * @returns {Promise<void>} A Promise that resolves once the like action is completed.
 */
export const likeBlog = (likedBlog) => {
    return async (dispatch) => {
        const blogData = { ...likedBlog, likes: likedBlog.likes + 1 };
        const updatedBlog = await blogService.update(likedBlog.id, blogData);

        dispatch(likeBlogAction(updatedBlog));
    };
};

/**
 * Deletes a blog from the server and updates the application state accordingly.
 *
 * @param {object} deletedBlog - The blog object to be deleted. Should contain all properties of the deleted blog.
 * @param {string} deletedBlog.id - The unique identifier of the blog to be deleted.
 * @returns {Promise<void>} - A Promise that resolves once the deletion process is complete.
 */
export const deleteBlog = (deletedBlog) => {
    return async (dispatch) => {
        await blogService.clear(deletedBlog.id);

        dispatch(deleteBlogAction(deletedBlog.id));
    };
};

export default blogSlice.reducer;
