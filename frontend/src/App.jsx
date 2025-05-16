import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import '../src/assets/styles/style.css'
import Home from "./pages/Home";

function App() {
    return (
      <>
      <Header/>
      <main className="p-3">

      <Container>
        <h1>Welcome to Digi Shop </h1>
        <Home/>
      </Container>
      </main>
      <Footer/>
      </>
    )
}

export default App;
