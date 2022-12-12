import { Card } from "react-bootstrap";

export function CardItem(props) {
    const { item, addFavourite, isFavourite, basketFocus } = props;
    const { id, image, title, price } = item;

    return (
        <Card className="text-start" key={id} onClick={basketFocus}>
            <div>
                {isFavourite(id) ? (
                    <img
                        onClick={() => addFavourite(id)}
                        className="icon"
                        src={require("../assets/heart_full.png")}
                        alt="wish"
                    />
                ) : (
                    <img
                        onClick={() => addFavourite(id)}
                        className="icon"
                        src={require("../assets/heart.png")}
                        alt="wish"
                    />
                )}
                <img className="icon" src={require("../assets/scale.png")} alt="compare" />
            </div>

            <Card.Img variant="top" src={image} alt={title} style={{ height: '200px' }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    $ {Number(price)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
