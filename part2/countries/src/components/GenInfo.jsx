import { useState } from "react";
import SpecInfo from "./SpecInfo";

const GenInfo = ({ countryNames }) => {
    const [Spec, setSpec] = useState(null);
    const handleClick = (ev) => {
        setSpec(ev.target.id);
        console.log(ev.target.key);
        console.log(ev.target.c);
    };

    if (Spec !== null) {
        return <SpecInfo countryName={Spec} />;
    } else {
        return (
            <div>
                {countryNames.map((c) => (
                    <div key={c} id={c}>
                        {c}{" "}
                        <button c={c} key={c} id={c} onClick={handleClick}>
                            show
                        </button>
                    </div>
                ))}
            </div>
        );
    }
};

export default GenInfo;
