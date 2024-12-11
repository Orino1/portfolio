//import logo from './logo.svg';
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import GlobalMessageProvider from "./contexts/GlobalMessageContext";
import AuthProvider from "./contexts/AuthContext";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

function App() {
    return (
        <AuthProvider>
            <GlobalMessageProvider>
                <Router>
                    <ScrollToTop/>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/contact" element={<Contact />}></Route>
                        <Route
                            path="/admin/login"
                            element={<AdminLogin />}
                        ></Route>
                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        ></Route>
                        <Route path="/*" element={<NotFound />}></Route>
                    </Routes>
                </Router>
            </GlobalMessageProvider>
        </AuthProvider>
    );
}

export default App;


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};