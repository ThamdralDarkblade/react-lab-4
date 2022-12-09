import Form from 'react-bootstrap/Form';
import {sortingTypes} from "../constants";


const { Select } = Form;
export function SortingDropdown(props) {
    const {setCurrentSorting} = props;
    const onChangeSorting = (e) => {
        setCurrentSorting(e.target.value);
    }

    return (
        <Select onChange={onChangeSorting} defaultValue={sortingTypes.ratingDESC}>
            <option value={sortingTypes.ratingDESC}>{sortingTypes.ratingDESC}</option>
            <option value={sortingTypes.ratingASC}>{sortingTypes.ratingASC}</option>
            <option value={sortingTypes.priceASC}>{sortingTypes.priceASC}</option>
            <option value={sortingTypes.priceDESC}>{sortingTypes.priceDESC}</option>
        </Select>
    );
}
