import countryService from "../service/country";
import { useState, useEffect } from "react";

const SpecInfo = ({ countryName }) => {
    const [specificInfo, setspecificInfo] = useState(null);

    useEffect(() => {
        countryService.get(countryName).then((returnedInfo) => {
            setspecificInfo(returnedInfo);
        });
    }, []);

    if (!specificInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{specificInfo.name.common}</h1>
            <div>capital {specificInfo.capital}</div>
            <div>area {specificInfo.area}</div>
            <br />
            <strong>languages:</strong>
            <ul>
                {Object.values(specificInfo.languages).map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
            <img src={specificInfo.flags.png} alt={specificInfo.flags.alt} />
        </div>
    );
};

export default SpecInfo;
