import Blog from "./Blog";
import BlogForm from "./BlogForm";

import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import Togglable from "./Togglable";

import { setNotification } from "../reducers/notifReducer";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

import { Button } from "react-bootstrap";

const AllBlogs = ({ blogs, addLike }) => {
    const dispatch = useDispatch();
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    const handleDelete = (targetBlog) => {
        if (
            window.confirm(
                `Remove blog -${targetBlog.title}- by ${targetBlog.author}`,
            )
        ) {
            dispatch(deleteBlog(targetBlog)).catch((err) => {
                console.log(err.response.data);
                console.error(err);
                // notify the user about the error
                dispatch(
                    setNotification(`${err.response.data.error}`, "error", 5),
                );
            });
        }
    };

    const blogStyle = {
        maxWidth: 500,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,

        fontSize: 20,
    };

    return (
        <div>
            <Togglable
                btnSize="lg"
                openButtonLabel="new blog"
                closeButtonLabel="cancel"
            >
                <BlogForm />
            </Togglable>
            <br />

            {sortedBlogs.map((blog) => (
                <div className="blog" key={blog.id} style={blogStyle}>
                    <strong>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </strong>
                    <Togglable
                        btnSize="sm"
                        openButtonLabel="view"
                        closeButtonLabel="hide"
                    >
                        <a>{blog.url}</a>
                        <div id="like">
                            likes {blog.likes}{" "}
                            <Button
                                size="sm"
                                id="button-like"
                                onClick={() => addLike(blog)}
                            >
                                like
                            </Button>
                        </div>
                        <div>{blog.author}</div>
                        <Button
                            size="sm"
                            variant="danger"
                            id="button-remove"
                            onClick={() => handleDelete(blog)}
                        >
                            remove
                        </Button>
                    </Togglable>
                </div>
            ))}
        </div>
    );
};

const Blogs = () => {
    const dispatch = useDispatch();

    // sort the blogs accoring to the likes they received
    const blogs = useSelector((state) => state.blogs);

    const addLike = (blog) => {
        dispatch(likeBlog(blog));
    };

    const blogSpecMatch = useMatch("/blogs/:id");
    const blogSpec = blogSpecMatch
        ? blogs.find((b) => b.id === blogSpecMatch.params.id)
        : null;

    return (
        <div>
            <h1>
                <strong>Blogs</strong>
            </h1>
            <Routes>
                <Route
                    path="/"
                    element={<AllBlogs blogs={blogs} addLike={addLike} />}
                />
                <Route
                    path="/blogs/:id"
                    element={<Blog blogSpec={blogSpec} addLike={addLike} />}
                />
            </Routes>
        </div>
    );
};

export default Blogs;
