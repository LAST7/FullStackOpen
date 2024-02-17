import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import userService from "../services/users";

import { Table } from "react-bootstrap";

const SingleUserCount = ({ author, authorId, blogCount }) => {
    return (
        <tr>
            <td>
                <Link to={`/users/${authorId}`}>{author}</Link>
            </td>
            <td>{blogCount}</td>
        </tr>
    );
};

const Users = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        userService
            .getAll()
            .then((userWithBlogs) => {
                setInfo(userWithBlogs);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!info) {
        return null;
    }

    return (
        <div>
            <h2>Users</h2>
            <strong>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>blogs created</td>
                        </tr>
                        {info.map((user) => (
                            <SingleUserCount
                                key={user.id}
                                author={user.name}
                                authorId={user.id}
                                blogCount={user.blogs.length}
                            />
                        ))}
                    </tbody>
                </Table>
            </strong>
        </div>
    );
};

export default Users;
