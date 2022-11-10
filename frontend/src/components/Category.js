import '../App.css';
import Place from './Place';
import Divider from '@mui/material/Divider';

function Category(props) {

    const numberOfPlaces = props.numberOfPlaces ?? 2;
    const name = props.name ?? "Category";
    const places = Array.from({ length: numberOfPlaces }, (v, i) => <Place></Place>)

    return (
        <div className="feed">
            <div style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
                <Divider> {name.toUpperCase()}</Divider>
                {places}
            </div>
        </div>
    );
}

export default Category;
