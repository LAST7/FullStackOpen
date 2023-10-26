import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryInfo from "./components/CountryInfo";
import countryService from "./service/country";

const App = () => {
    const [SearchTerm, setSearchTerm] = useState(null);
    const [Countries, setCountries] = useState(null);

    useEffect(() => {
        countryService
            .getAll()
            .then((initialInfo) => {
                setCountries(initialInfo.map((c) => c.name.common));
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <SearchBar setSearchTerm={setSearchTerm} />
            <CountryInfo countries={Countries} searchTerm={SearchTerm} />
        </div>
    );
};

export default App;
