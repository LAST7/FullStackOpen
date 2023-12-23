import blogService from "../services/blogs";
import Togglable from "./Togglable";

const Blogs = ({ blogs, setBlogs, setNotice }) => {
    // sort the blogs accoring to the likes they received
    blogs = blogs.sort((a, b) => b.likes - a.likes);

    const deleteBlog = (targetBlog) => {
        const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
        if (
            window.confirm(
                `Remove blog -${targetBlog.title}- by ${targetBlog.author}`,
            )
        ) {
            blogService
                .clear(targetBlog.id)
                .then((response) => {
                    setBlogs(blogs.filter((b) => b.id !== targetBlog.id));
                })
                .catch((exception) => {
                    console.log(exception.response.data);
                    console.error(exception);
                    setNotice({
                        msg: `${exception.response.data.error}`,
                        type: "error",
                    });
                    setTimeout(
                        () =>
                            setNotice({
                                msg: null,
                                type: null,
                            }),
                        5000,
                    );
                });
        }
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const addLike = (blog) => {
        const newBlog = { ...blog, likes: blog.likes + 1 };

        blogService.update(blog.id, newBlog).then((updatedBlog) => {
            setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
        });
    };

    return (
        <div>
            {blogs.map((blog) => (
                <div className="blog" key={blog.id} style={blogStyle}>
                    <strong>{blog.title}</strong>
                    <Togglable openButtonLabel="view" closeButtonLabel="hide">
                        <a>{blog.url}</a>
                        <div id="like">
                            likes {blog.likes}{" "}
                            <button
                                id="button-like"
                                onClick={() => addLike(blog)}
                            >
                                like
                            </button>
                        </div>
                        <div>{blog.author}</div>
                        <button
                            id="button-remove"
                            onClick={() => deleteBlog(blog)}
                        >
                            remove
                        </button>
                    </Togglable>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
