const lodash = require("lodash");

/**
 * Dummy always return 1
 *
 * @param {Array} blogs
 * @returns Number
 */
const dummy = (blogs) => {
    return 1;
};

/**
 * Returns the total number of likes of the blogs in the array
 *
 * @param {Array} blogs
 * @returns {Number}
 */
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

/**
 * Return the blog which received the most likes
 *
 * @param {Array} blogs
 * @returns {Object}
 */
const favoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce((favorite, blog) => {
        if (blog["likes"] > favorite["likes"]) {
            return blog;
        } else {
            return favorite;
        }
    }, blogs[0]);

    return {
        title: favoriteBlog["title"],
        author: favoriteBlog["author"],
        likes: favoriteBlog["likes"],
    };
};

/**
 * Return the author who wrote the most blogs,
 * and the total number of the blogs he/she wrote
 *
 * @param {Array} blogs
 * @returns {Object}
 */
const mostBlogs = (blogs) => {
    const classification = lodash.groupBy(blogs, "author");

    // find the one who wrote the most blogs
    const mostBlogAuthor = Object.keys(classification).reduce(
        (mostBlogAuthor, current) => {
            if (
                classification[current].length >
                classification[mostBlogAuthor].length
            ) {
                return current;
            } else {
                return mostBlogAuthor;
            }
        },
        blogs[0]["author"],
    );

    return {
        author: mostBlogAuthor,
        blog: classification[mostBlogAuthor].length,
    };
};

const mostLikes = (blogs) => {
    const classification = lodash.groupBy(blogs, "author");

    // find the one who wrote the most blogs
    let maxLikes = 0;
    const mostLikeAuthor = Object.keys(classification).reduce(
        (mostLikeAuthor, current) => {
            const currentLikes = totalLikes(classification[current]);
            if (currentLikes > maxLikes) {
                maxLikes = currentLikes;
                return current;
            } else {
                return mostLikeAuthor;
            }
        },
        blogs[0]["author"],
    );

    return {
        author: mostLikeAuthor,
        likes: maxLikes,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
