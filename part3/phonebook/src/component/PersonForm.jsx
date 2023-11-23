import { useState } from "react";
import phoneService from "../services/persons";

const PersonForm = ({ Persons, setPersons, setNotice }) => {
    const [newName, setnewName] = useState("");
    const [newPhone, setnewPhone] = useState("");

    const nameExists = (name) => {
        return Persons.some((p) => p.name === name);
    };

    const addPerson = (ev) => {
        ev.preventDefault();

        const newPerson = {
            name: newName,
            number: newPhone,
            id: Persons.length + 1,
        };

        if (nameExists(newName)) {
            updatePerson(newPerson);
        } else {
            addNewperson(newPerson);
        }
    };

    const addNewperson = (newPerson) => {
        phoneService
            .create(newPerson)
            .then((returnedPerson) => {
                setPersons(Persons.concat(returnedPerson));
                // Empty the input fields
                setnewName("");
                setnewPhone("");
                // Notification
                setNotice({
                    msg: `Added ${newName}`,
                    type: "add",
                });
                setTimeout(() => setNotice({ msg: null, type: null }), 3000);
            })
            .catch((err) => {
                console.error(err.response.data.error);
                setNotice({
                    msg: err.response.data.error,
                    type: "error",
                });
                setTimeout(() => setNotice({ msg: null, type: null }), 3000);
            });
    };

    const updatePerson = (updatedPerson) => {
        const repetition =
            "is already added to phonebook, replace the old number with a new one?";
        if (window.confirm(`${newName} ${repetition}`)) {
            const repeatedId = Persons.find((p) => p.name === newName).id;
            phoneService
                .update(repeatedId, updatedPerson)
                .then((returnedPerson) => {
                    setPersons(
                        Persons.map(
                            (p) =>
                                (p = p.id === repeatedId ? returnedPerson : p),
                        ),
                    );
                    // Empty the input fields
                    setnewName("");
                    setnewPhone("");
                    // Notification
                    setNotice({
                        msg: `Added ${newName}`,
                        type: "add",
                    });
                    setTimeout(
                        () => setNotice({ msg: null, type: null }),
                        3000,
                    );
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
                    // setPersons(Persons.filter((p) => p.id !== repeatedId));
                });
        }
    };

    const handleNameChange = (ev) => {
        setnewName(ev.target.value);
    };

    const handlePhoneChange = (ev) => {
        setnewPhone(ev.target.value);
    };

    return (
        <form onSubmit={addPerson}>
            <div>
                name:{" "}
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:{" "}
                <input
                    type="text"
                    value={newPhone}
                    onChange={handlePhoneChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
