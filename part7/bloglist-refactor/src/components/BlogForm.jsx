import { useState } from "react";

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notifReducer";
import { appendBlog } from "../reducers/blogReducer";

import { Form, Button } from "react-bootstrap";

const BlogForm = () => {
    const dispatch = useDispatch();

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

        const newBlogObject = {
            title,
            author,
            url,
        };

        dispatch(appendBlog(newBlogObject))
            .then(
                dispatch(
                    setNotification(
                        `a new blog: -${title}- by ${author} added`,
                        "add",
                        5,
                    ),
                ),
            )
            .catch((err) => {
                console.error(err);
                dispatch(
                    setNotification(
                        "token expired, please log in again.",
                        "error",
                        5,
                    ),
                );
            });

        // empty the field
        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <div className="formDiv">
            <h2>Create a new blog</h2>
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>title: </Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        name="input-author"
                        type="text"
                        value={author}
                        onChange={handleAuthorChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>url:</Form.Label>
                    <Form.Control
                        name="input-url"
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        required
                    />
                </Form.Group>

                <br />
                <Button variant="success" type="submit">
                    save
                </Button>
            </Form>
        </div>
    );
};

export default BlogForm;
