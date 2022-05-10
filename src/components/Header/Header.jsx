import React from 'react';
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__left">
                    <span>React movie</span>
                </div>
                <div className="header__right">
                    <NavLink to='/movies'>Home </NavLink>
                    /
                    <NavLink to='/import'> Import File </NavLink>
                    /
                    <NavLink to='/find'> Find</NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;