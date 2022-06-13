import React from "react";
import "./Header.module.scss";

const menuList = ["Співробітники", "Звіт"];

const Header = () => {
    return (
        <ul>
            {menuList.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    );
}

export default Header;