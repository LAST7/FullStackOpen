import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
    const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/name";
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${name}`)
            .then((fetchedCountry) =>
                setCountry({
                    ...fetchedCountry,
                    found: true,
                }),
            )
            .catch((err) => console.error(err));
    }, [name]);

    // TEST: log
    if (country) {
        console.log(country);
    }

    return country;
};
