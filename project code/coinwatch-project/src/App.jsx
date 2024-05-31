

import { useState, useEffect } from "react";
import { Header } from './components/Header';
import { Mainpage } from './components/Mainpage.jsx';
import { Routes, Route } from "react-router-dom";
import { Coinpage } from "./components/Coinpage.jsx";
import { Setting } from "./components/Setting.jsx";
import Footer from "./components/Footer.jsx";






function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true' || false;
    });

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (darkMode) {
            body.classList.add('body_dark');
        } else {
            body.classList.remove('body_dark');
        }
    }, [darkMode]);

    return (
        <>
            <div className={`extension-wrapper ${darkMode ? 'body_dark' : ''}`}>
                <Header />
                <Routes>
                    <Route index path="*" element={<Mainpage darkMode={darkMode} />} exact />
                    <Route path="/setting" element={<Setting toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} exact />
                    <Route path="/coins/:id" element={<Coinpage darkMode={darkMode} />} />
                </Routes>
                <Footer darkMode={darkMode} />
            </div>
        </>
    );
}

export default App;
