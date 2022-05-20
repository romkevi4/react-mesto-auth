import React from 'react';


export default function ImagePopup({ card, onClose }) {
    return (
        <div
            className={`popup popup_opacity ${card.link ? 'popup_opened' : ''}`}
            id="popup-image"
        >
            <div className="popup__container popup__container_size_big">
                <button
                    onClick={onClose}
                    aria-label="Закрыть"
                    type="button"
                    className="popup__close-button"
                />
                <img
                    src={card.link}
                    alt={card.name}
                    className="popup__image"
                />
                <p className="popup__text">
                    {card.name}
                </p>
            </div>
        </div>
    );
}