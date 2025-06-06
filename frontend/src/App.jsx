import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "../src/assets/styles/style.css";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <main className="p-3">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <ToastContainer/>
        </>
    );
}

export default App;
