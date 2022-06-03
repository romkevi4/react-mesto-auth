import React from 'react';


export default function Popup({ partOfId, isOpen, onClose, children }) {
    return (
        <div
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
            id={`popup-${partOfId}`}
        >
            <div className="popup__container">
                <button
                    onClick={onClose}
                    aria-label="Закрыть"
                    type="button"
                    className="popup__close-button"
                />
                {children}
            </div>
        </div>
    );
}