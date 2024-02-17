import Comments from "./Comments";

import { Button } from "react-bootstrap";

const Blog = ({ blogSpec, addLike }) => {
    if (!blogSpec) {
        return null;
    } else {
        return (
            <div>
                <h1>{blogSpec.title}</h1>
                <a href={blogSpec.url}>{blogSpec.url}</a>
                <p>
                    {blogSpec.likes} likes{" "}
                    <Button size="sm" onClick={() => addLike(blogSpec)}>
                        like
                    </Button>
                </p>
                <p>added by {blogSpec.author}</p>

                <Comments blogId={blogSpec.id} />
            </div>
        );
    }
};

export default Blog;
