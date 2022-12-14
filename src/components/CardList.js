import {useState, useEffect} from 'react';
import {CardItem} from './CardItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {orders, sortingTypes, fields} from '../constants';
import {SortingDropdown} from './SortingDropdown'
import {FilterDropdown} from "./FilterDropdown";

function filter(data, setData, category) {
    if (category === 'all') {
        return data;
    }
    return data.filter(product => product.category === category);
}


function sort(data, sortingType) {
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


export function CardList(props) {
    const { dataURL, basketRef} = props;
    const [data, setData] = useState([]);
    const [currentSorting, setCurrentSorting] = useState(sortingTypes.ratingDESC);
    const [currentFilter, setCurrentFilter] = useState('all');
    const basketFocus = () => basketRef.current.focus();
    const [favourites, setFavourites] = useState([]);

    const addFavourite = (id) => {
        let arr = favourites;
        let addArr = true;
        arr.map((item, key) => {
            if (item === id) {
                arr.splice(key, 1);
                addArr = false;
            }
        });
        if (addArr) {
            arr.push(id);
        }
        setFavourites([...arr]);
        setLocalFavourites([...arr])
    }

    const getLocalFavourites = () => {
        return JSON.parse(localStorage.getItem('favourites')) || [];
    }
    const setLocalFavourites = (favourites) => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }

    const isFavourite = (id) => {
        return favourites.includes(id);
    }

    useEffect(() => {
        fetch(dataURL)
            .then((response) => response.json())
            .then((responseJson) => setData(responseJson))
            .catch((error) => {
                console.error(error);
            });
    }, [dataURL]);

    useEffect(() => {
        setFavourites(getLocalFavourites());
    }, []);

    const filteredData = filter(data, setCurrentFilter, currentFilter);
    sort(filteredData, currentSorting);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <SortingDropdown setCurrentSorting={setCurrentSorting}/>
                    </Col>
                    <Col>
                        <FilterDropdown setCurrentFilter={setCurrentFilter} data={data}/>
                    </Col>
                </Row>
            </Container>
            <Row xs={3} md={5} className="g-4">
                {filteredData.map((item) =>
                    <CardItem
                        key={item.id}
                        item={item}
                        addFavourite={addFavourite}
                        isFavourite={isFavourite}
                        basketFocus={basketFocus}
                    />
                )}
                <Col>
                </Col>
            </Row>
        </div>
    );
}
