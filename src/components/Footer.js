import React from 'react';


export default function Footer() {
    return (
        <footer className="footer">
            <address className="footer__copyright">
                &#169; {new Date().getFullYear()} Mesto Russia
            </address>
        </footer>
    );
}