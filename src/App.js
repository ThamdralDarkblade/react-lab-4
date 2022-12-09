import './App.css';
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {CardList} from "./components/CardList";

const dataURL = 'https://fakestoreapi.com/products'

function App() {
    return (
        <div className="App">
            <Container>
                <Button variant="outline-secondary" id="button-cart">
                    <img className="icon" src={require("./assets/shopping-cart.png")} alt="wish"/>
                </Button>
                {CardList(dataURL)}
            </Container>
        </div>
    );
}

export default App;
