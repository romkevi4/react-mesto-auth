import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/header/__logo/header-logo.svg';


export default function Header({ userEmail, headerLinkClass, linkText }) {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Изображен логотип"
                className="header__logo"
            />
            <div className="header__wrapper">
                <span className="header__user-email">{userEmail}</span>
                <Link to="/" className={`header__link ${headerLinkClass}`}>{linkText}</Link>
            </div>
        </header>
    );
}