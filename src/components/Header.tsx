import React from "react";
import "./Header.module.scss";
import {useNavigate} from "react-router-dom";

const menuList = [
    {link: "/employees", caption: "Співробітники"},
    {link: "/report", caption: "Звіт"}
];

const Header = () => {
    const navigate = useNavigate();
    return (
        <ul>
            {menuList.map((item, index) =>
                <li
                    key={index}
                    onClick={() => navigate(item.link, { replace: false })}
                >
                    {item.caption}
                </li>)
            }
        </ul>
    );
}

export default Header;