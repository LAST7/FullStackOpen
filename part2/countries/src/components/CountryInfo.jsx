import SpecInfo from "./SpecInfo";
import GenInfo from "./GenInfo";

const CountryInfo = ({ countries, searchTerm }) => {
    if (!countries) {
        return <p>Loading...</p>;
    } else if (!searchTerm) {
        return null;
    }

    // match the search term
    const results = countries.filter((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (results.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    }

    if (results.length === 1) {
        return <SpecInfo countryName={results[0]} />;
    } else {
        return <GenInfo countryNames={results} />;
    }
};

export default CountryInfo;
