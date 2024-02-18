import { useState, useEffect } from "react";
import { Link, Routes, Route, useMatch } from "react-router-dom";

import userService from "../services/users";

import User from "./User";

import { Table } from "react-bootstrap";

const SingleUserCount = ({ author, authorId, blogCount }) => (
    <tr>
        <td>
            <Link to={`/users/${authorId}`}>{author}</Link>
        </td>
        <td>{blogCount}</td>
    </tr>
);

const AllUsers = ({ allUsers }) => (
    <div>
        <h2>Users</h2>
        <strong>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td></td>
                        <td>blogs created</td>
                    </tr>
                    {allUsers.map((user) => (
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

const Users = () => {
    const [allUsers, setAllUsers] = useState(null);

    useEffect(() => {
        userService
            .getAll()
            .then((userWithBlogs) => {
                setAllUsers(userWithBlogs);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const match = useMatch("/users/:id");
    if (!allUsers) {
        return null;
    }
    const userSpec = match
        ? allUsers.find((u) => u.id === match.params.id)
        : null;

    return (
        <div>
            <Routes>
                <Route path="/" element={<AllUsers allUsers={allUsers} />} />
                <Route path="/:id" element={<User user={userSpec} />} />
            </Routes>
        </div>
    );
};

export default Users;
