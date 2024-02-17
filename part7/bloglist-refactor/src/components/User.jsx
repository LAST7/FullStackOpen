import { ListGroup } from "react-bootstrap";

const User = ({ user }) => {
    const style = {
        maxWidth: 500,
    };

    if (!user) {
        return <div>loading...</div>;
    } else {
        return (
            <div className="user-spec" style={style}>
                <h2>{user.name}</h2>
                <h3> added blogs</h3>
                <br />
                <ListGroup>
                    {user.blogs.map((b) => (
                        <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
    }
};

export default User;
