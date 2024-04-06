import { useEffect } from "react";
import Content from "./Views/Content";
import Footer from "./Views/Footer";
import Header from "./Views/Header";

function App() {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default App;