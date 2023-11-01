import "react-bootstrap";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/Index";

function App() {
    return (
        <>
            <BrowserRouter>
                <Container>
                    <Routes>
                        <Route path="/" element={<Index />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    );
}

export default App;
