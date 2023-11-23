import phoneService from "../services/persons";

const PersonInfo = ({ Persons, setPersons, setNotice }) => {
    // the initial state
    if (!Persons) {
        return null;
    }

    const onDelete = (id) => () => {
        const deleteName = Persons.find((p) => p.id === id).name;
        if (window.confirm(`Delete ${deleteName}?`)) {
            phoneService
                .clear(id)
                .then(() => {
                    setPersons(Persons.filter((p) => p.id !== id));
                })
                .catch((err) => {
                    console.error(err.response.data.error);
                    setNotice({
                        msg: err.response.data.error,
                        type: "error",
                    });
                    setTimeout(
                        () => setNotice({ msg: null, type: null }),
                        3000,
                    );
                    setPersons(Persons.filter((p) => p.id !== id));
                });
        }
    };

    return (
        <table>
            {Persons.map((p) => (
                <tbody key={p.id}>
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.number}</td>
                        <td>
                            <button key={p.id} onClick={onDelete(p.id)}>
                                delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            ))}
        </table>
    );
};

export default PersonInfo;
