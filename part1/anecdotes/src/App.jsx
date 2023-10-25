import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setnewNote] = useState("void of myself");
    const [showAll, setshowAll] = useState(false);

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    const addNote = (ev) => {
        ev.preventDefault();

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };

        setNotes(notes.concat(noteObject));
        setnewNote("");
    };

    const handleNoteChange = (ev) => {
        setnewNote(ev.target.value);
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setshowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note note={note} key={note.id} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input
                    type="text"
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
            <br />
        </div>
    );
};

export default App;
