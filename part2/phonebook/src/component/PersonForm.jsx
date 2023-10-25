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

        const repetition =
            "is already added to phonebook, replace the old number with a new one?";
        if (nameExists(newName)) {
            if (window.confirm(`${newName} ${repetition}`)) {
                const repeatedId = Persons.find((p) => p.name === newName).id;
                phoneService
                    .update(repeatedId, newPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            Persons.map(
                                (p) =>
                                    (p =
                                        p.id === repeatedId
                                            ? returnedPerson
                                            : p),
                            ),
                        );
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
                        console.error(err);
                        setNotice({
                            msg: `Information of ${newName} has already been removed from server`,
                            type: "error",
                        });
                        setTimeout(
                            () => setNotice({ msg: null, type: null }),
                            3000,
                        );
                        setPersons(Persons.filter((p) => p.id !== repeatedId));
                    });
            }
        } else {
            phoneService
                .create(newPerson)
                .then((returnedPerson) => {
                    setPersons(Persons.concat(returnedPerson));
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
                    // alert("Can not add person.");
                    console.error(err);
                    setNotice({
                        msg: "Can not add person",
                        type: "error",
                    });
                    setTimeout(
                        () => setNotice({ msg: null, type: null }),
                        3000,
                    );
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
