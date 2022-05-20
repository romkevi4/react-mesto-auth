import React from 'react';

import logo from '../images/header/__logo/header-logo.svg';


export default function Header() {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Изображен логотип Mesto"
                className="header__logo"
            />
        </header>
    );
}