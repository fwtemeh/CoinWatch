import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Setting({ toggleDarkMode, darkMode }) {
    let navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedDarkMode = localStorage.getItem("darkMode");
        return storedDarkMode ? JSON.parse(storedDarkMode) : darkMode;
    });

    const handleToggleDarkMode = (e) => {
        const isDarkModeChecked = e.target.checked;
        setIsDarkMode(isDarkModeChecked);
        toggleDarkMode(isDarkModeChecked);
        localStorage.setItem("darkMode", JSON.stringify(isDarkModeChecked));
    };

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);
        return (

                <div className="settings-page">
                    <section className="mb-5" style={{paddingBottom: '300px'}} id="extension-settings">
                        <div className="container-fluid">
                            <div className="section-header text-start text-uppercase mb-3">
                                <h2>Extension Settings</h2>
                                <button type="button" className="back-button" onClick={()=>navigate('/')}><i className="fa-solid fa-chevron-left"></i> Back</button>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="extension-card">
                                        <div className="settings-item-card">
                                            <div className="settings-item-key">
                                                <div className="setting-item-icon">
                                                    <i className="fa-solid fa-moon"></i>
                                                </div>
                                                <h3>
                                                    Dark Mode
                                                </h3>
                                            </div>
                                            <div className="settings-item-value">
                                                <label className="switch">
                                                    <input type="checkbox" onChange={handleToggleDarkMode} checked={darkMode}  />
                                                        <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>

        );
    }

/*
import {useNavigate} from "react-router-dom";


export function Setting({toggleDarkMode ,darkMode}) {
    let navigate = useNavigate();





    const handleToggleDarkMode = (e) => {
        toggleDarkMode(e.target.checked);
    };
        return (

                <div className="settings-page">
                    <section className="mb-5" style={{paddingBottom: '300px'}} id="extension-settings">
                        <div className="container-fluid">
                            <div className="section-header text-start text-uppercase mb-3">
                                <h2>Extension Settings</h2>
                                <button type="button" className="back-button" onClick={()=>navigate('/')}><i className="fa-solid fa-chevron-left"></i> Back</button>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="extension-card">
                                        <div className="settings-item-card">
                                            <div className="settings-item-key">
                                                <div className="setting-item-icon">
                                                    <i className="fa-solid fa-moon"></i>
                                                </div>
                                                <h3>
                                                    Dark Mode
                                                </h3>
                                            </div>
                                            <div className="settings-item-value">
                                                <label className="switch">
                                                    <input type="checkbox" onChange={handleToggleDarkMode} checked={darkMode}  />
                                                        <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>

        );
    }
*/

