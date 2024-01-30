import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (ev) => {
        ev.preventDefault();
        const filterWord = ev.target.value;

        dispatch(setFilter(filterWord));
    };
    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    );
};

export default Filter;
