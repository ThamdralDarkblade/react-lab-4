import {useState, useEffect, useRef} from "react";
import {CardItem} from "./CardItem";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function CardList(dataURL) {
    const [data, setData] = useState([])
    const inputRef = useRef(null);
    const focus = () => inputRef.current.focus();

    useEffect(() => {
        fetch(dataURL)
            .then((response) => response.json())
            .then((responseJson) => setData(responseJson))
            .catch((error) => {
                console.error(error);
            });
    }, [dataURL])

    return (
        <Row xs={3} md={5} className="g-4">
            {data.map((item) => {
                return CardItem(item)
            })}
            <Col>
            </Col>
        </Row>
    );
}
