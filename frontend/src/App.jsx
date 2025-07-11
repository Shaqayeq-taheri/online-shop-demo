import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/styles/style.css";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
        
      
            <Header />
            <main className="flex-grow-1 p-3">
               
                {/* This grows to push footer down */}
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
