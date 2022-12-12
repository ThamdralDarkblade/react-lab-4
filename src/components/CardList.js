import { useState, useEffect, useRef } from 'react';
import { CardItem } from './CardItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { orders, sortingTypes, fields } from '../constants';
import { SortingDropdown } from './SortingDropdown'

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
    const sortedData = data.sort(sorter);
    console.log(sortedData);
}


export function CardList(dataURL) {
    const [data, setData] = useState([]);
    const [currentSorting, setCurrentSorting] = useState(sortingTypes.ratingDESC);
    const inputRef = useRef(null);
    const focus = () => inputRef.current.focus();
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

    sort(data, setData, currentSorting);

    return (
        <div>
            {SortingDropdown({ setCurrentSorting })}
            <Row xs={3} md={5} className="g-4">
                {data.map((item) => 
                    <CardItem
                        key={item.id}
                        item={item}
                        addFavourite={addFavourite}
                        isFavourite={isFavourite}
                    />
                )}
                <Col>
                </Col>
            </Row>
        </div>
    );
}
