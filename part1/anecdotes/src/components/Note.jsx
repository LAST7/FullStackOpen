const Note = ({ note }) => {
    if (note.important) {
        return (
            <strong>
                <li>{note.content}</li>
            </strong>
        );
    } else {
        return <li>{note.content}</li>;
    }
};

export default Note;
