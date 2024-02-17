import { useState, useEffect } from "react";

import blogService from "../services/blogs";

import { Button, Form, ListGroup } from "react-bootstrap";

const Comments = ({ blogId }) => {
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        blogService
            .getComments(blogId)
            .then((c) => setComments(c))
            .catch((err) =>
                console.error("error when fetching comments: " + err),
            );
    }, []);

    const handleCommentChange = (ev) => {
        setContent(ev.target.value);
    };

    const addComment = (ev) => {
        ev.preventDefault();

        const comment = {
            content,
        };

        blogService
            .createComment(blogId, comment)
            .then((c) => setComments(comments.concat(c)))
            .catch((err) =>
                console.error("error when creating comment: " + err),
            );

        setContent("");
    };

    const style = {
        maxWidth: 500,
    };

    return (
        <div className="comment" style={style}>
            <h2>comments</h2>

            <Form onSubmit={addComment}>
                <Form.Group>
                    <Form.Label>add new comment</Form.Label>
                    <Form.Control
                        type="text"
                        value={content}
                        onChange={handleCommentChange}
                    />
                </Form.Group>

                <br />
                <Button size="sm" type="submit">
                    add comment
                </Button>
            </Form>

            <br />
            <ListGroup>
                {comments.map((c) => (
                    <ListGroup.Item key={c.id}>{c.content}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Comments;
