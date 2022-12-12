import './App.css';
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {CardList} from "./components/CardList";
import {useRef} from "react";

const dataURL = 'https://fakestoreapi.com/products'

function App() {
    const basketRef = useRef(null);
    return (
        <div className="App">
            <Container>
                <Button variant="outline-secondary" id="button-cart" ref={basketRef}>
                    <img className="icon" src={require("./assets/shopping-cart.png")} alt="wish"/>
                </Button>
                <CardList dataURL={dataURL} basketRef={basketRef}/>
            </Container>
        </div>
    );
}

export default App;
