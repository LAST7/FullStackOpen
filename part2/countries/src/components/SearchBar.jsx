const SearchBar = ({ setSearchTerm }) => {
    const handleChange = (ev) => {
        ev.preventDefault();
        setSearchTerm(ev.target.value);
    };

    return (
        <div>
            <form action="">
                {"find countries "}
                <input type="text" onChange={handleChange} />
            </form>
        </div>
    );
};

export default SearchBar;
