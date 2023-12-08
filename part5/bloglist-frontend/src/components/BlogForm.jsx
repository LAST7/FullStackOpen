import { useState } from "react";
import BlogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setNotice }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleTitleChange = (ev) => {
        setTitle(ev.target.value);
    };
    const handleAuthorChange = (ev) => {
        setAuthor(ev.target.value);
    };
    const handleUrlChange = (ev) => {
        setUrl(ev.target.value);
    };

    const addBlog = (ev) => {
        ev.preventDefault();

        // create the blog object and save to the server
        const newBlogObject = {
            title,
            author,
            url,
        };
        BlogService.create(newBlogObject)
            .then((savedBlog) => {
                setBlogs(blogs.concat(savedBlog));
                // empty the input field
                setTitle("");
                setAuthor("");
                setUrl("");
                // show notification about the added blog
                setNotice({
                    msg: `a new blog: -${title}- by ${author} added`,
                });
            })
            .catch((exception) => {
                console.error(exception);
                setNotice({
                    msg: "token expired, please log in again",
                    type: "error",
                });
            });
        // empty the notification
        setTimeout(() => {
            setNotice({
                msg: null,
                type: null,
            });
        }, 5000);
    };

    return (
        <div className="formDiv">
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <table>
                    <tbody>
                        <tr>
                            <td>title: </td>
                            <td>
                                <input
                                    id="input-title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>author: </td>
                            <td>
                                <input
                                    id="input-author"
                                    value={author}
                                    onChange={handleAuthorChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>url: </td>
                            <td>
                                <input
                                    id="input-url"
                                    value={url}
                                    onChange={handleUrlChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default BlogForm;
