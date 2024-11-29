//import logo from './logo.svg';
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import GlobalMessageProvider from "./contexts/GlobalMessageContext";

function App() {
    return (
        <GlobalMessageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/blog" element={<Blog />}></Route>
                    <Route path="/admin/login" element={<AdminLogin />}></Route>
                    <Route path="/admin" element={<AdminDashboard />}></Route>
                </Routes>
            </Router>
        </GlobalMessageProvider>
    );
}

export default App;
