import {useState, useEffect, useRef} from 'react';
import {CardItem} from './CardItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {orders, sortingTypes, fields} from '../constants';
import {SortingDropdown} from './SortingDropdown'

function sort(data, setData, sortingType) {
    const [field, order] = sortingType.split(', ');
    let greater, less;
    if (order === orders.desc) {
        greater = -1;
        less = 1;
    } else {
        greater = 1;
        less = -1;
    }
    let sorter
    if (field.toLowerCase() === fields.rating) {
        sorter = (a, b) => (a.rating.rate > b.rating.rate ? greater : less);
    } else {
        sorter = (a, b) => (a.price > b.price ? greater : less);
    }
    data.sort(sorter);
}


export function CardList(dataURL, basketRef) {
    const [data, setData] = useState([]);
    const [currentSorting, setCurrentSorting] = useState(sortingTypes.ratingDESC);
    const inputRef = useRef(null);
    const focus = () => inputRef.current.focus();
    const basketFocus = () => basketRef.current.focus();

    useEffect(() => {
        fetch(dataURL)
            .then((response) => response.json())
            .then((responseJson) => setData(responseJson))
            .catch((error) => {
                console.error(error);
            });
    }, [dataURL]);

    sort(data, setData, currentSorting);

    return (
        <div>
            {SortingDropdown({setCurrentSorting})}
            <Row xs={3} md={5} className="g-4">
                {data.map((item) => {
                    return CardItem({item, basketFocus})
                })}
                <Col>
                </Col>
            </Row>
        </div>
    );
}
