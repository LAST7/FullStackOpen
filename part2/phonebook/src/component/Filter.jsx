const Filter = ({ Persons, setFilteredPersons, setFiltered }) => {
    const handleFilterChange = (ev) => {
        ev.preventDefault();
        const FilterWord = ev.target.value.toLowerCase();

        if (FilterWord === "") {
            setFiltered(false);
        } else {
            setFiltered(true);
        }

        setFilteredPersons(
            Persons.filter((p) =>
                Persons.some(() => p.name.toLowerCase().includes(FilterWord)),
            ),
        );
    };

    return (
        <div>
            <form>
                filter shown with{" "}
                <input type="text" onChange={handleFilterChange} />
            </form>
        </div>
    );
};

export default Filter;
