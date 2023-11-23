import { useState, useEffect } from "react";
import PersonForm from "./component/PersonForm";
import Notification from "./component/Notification";
import PersonInfo from "./component/PersonInfo";
import Filter from "./component/Filter";
import phoneService from "./services/persons";

const App = () => {
    const [Persons, setPersons] = useState(null);
    const [FilteredPersons, setFilteredPersons] = useState([]);
    const [notice, setNotice] = useState({
        msg: null,
        type: null,
    });
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        phoneService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
            .catch((err) => {
                alert("Can not fetch note data, is server up?");
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notice={notice} />
            <Filter
                Persons={Persons}
                setFilteredPersons={setFilteredPersons}
                setFiltered={setFiltered}
            />

            <h3>Add a new</h3>
            <PersonForm
                Persons={Persons}
                setPersons={setPersons}
                setNotice={setNotice}
            />

            <h3>Numbers</h3>
            <PersonInfo
                Persons={filtered ? FilteredPersons : Persons}
                setPersons={setPersons}
                setNotice={setNotice}
            />
        </div>
    );
};

export default App;
