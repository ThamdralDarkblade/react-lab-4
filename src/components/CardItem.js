import {useState} from "react"
import { Button, Card } from "react-bootstrap";
import {Portal} from "./Portal"

export function CardItem(props) {
    const { item, addFavourite, isFavourite, basketFocus } = props;
    const { id, image, title, price } = item;
    const [open, setOpen] = useState(false); 

    return (
        <Card className="text-start" key={id}>
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
                <img
                    onClick={() => setOpen(true)}
                    className="icon"
                    src={require("../assets/scale.png")}
                    alt="compare"
                />
                <Portal open={open} onClose={() => setOpen(false)}>
                    <div><u>{title}</u> added to comparison</div>
                </Portal>
                <Button variant="" id="button-cart" onClick={basketFocus}>
                    <img className="icon" src={require("../assets/shopping-cart.png")} alt="wish" />
                </Button>
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
