const Weather = ({ countryName, lat, lng }) => {
    return (
        <div>
            <h1>{countryName}</h1>
            <p>
                Got no access to the weather to the country at {lat} {lng}
            </p>
        </div>
    );
};
