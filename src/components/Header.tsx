import React from "react";
import "./Header.module.scss";
import {Link} from "react-router-dom";

const menuList = [
    {link: "/employees", caption: "Співробітники"},
    {link: "/report", caption: "Звіт"}
];

const Header = () => {
    return (
        <ul>
            {menuList.map((item, index) =>
                <li key={index}>
                    <Link to={item.link}>{item.caption}</Link>
                </li>)
            }
        </ul>
    );
}

export default Header;