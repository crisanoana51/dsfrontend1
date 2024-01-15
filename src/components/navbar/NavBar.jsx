import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function Navbar({ buttons = [], logoText = "Your Logo" }) {
    const [tabs, setButtons] = useState(buttons);
    console.log(tabs)
    return (
        <header className="header" id="navigation-menu">
            <div className="container">
                <nav>
                    <Link to="/">{logoText}</Link>
                    <ul className="nav-menu">
                        {tabs.map((tab) => (
                            <li key={tab.ref} >
                                <Link href={tab.ref} to={tab.ref} className="nav-link">
                                    {tab.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
