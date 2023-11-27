const Blog = require("../models/blog");
const User = require("../models/users");

const initialBlogs = [
    {
        title: "Blade Runnder 2049",
        author: "Villeneuve",
        url: "www.bloglast.top",
        likes: 2049,
    },
    {
        title: "Elden Ring",
        author: "From Software",
        url: "www.imlast.top",
        likes: 298,
    },
];

const nonExistingId = async () => {
    const tempBlog = new Blog({
        title: "willremovethissoon",
    });

    await tempBlog.save();
    await tempBlog.deleteOne();

    return tempBlog._id.toString();
};

/**
 * Return all the blogs remaining in the database
 *
 * @returns {Array}
 */
const blogsInDB = async () => {
    const blogs = await Blog.find({});

    return blogs.map((b) => b.toJSON());
};

const usersInDB = async () => {
    const users = await User.find({});

    return users.map((u) => u.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDB,
    usersInDB,
};
