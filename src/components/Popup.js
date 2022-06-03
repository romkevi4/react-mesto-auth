import React, { useEffect } from 'react';


export default function Popup({
        isOpen,
        partOfId,
        onClose,
        popupClass,
        popupContainerClass,
        children
    }) {

    useEffect(() => {
        if (!isOpen) return;

        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', closeByEscape);

        return () => document.removeEventListener('keydown', closeByEscape);

    }, [isOpen, onClose]);

    const handleOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }


    return (
        <div
            className={`popup ${popupClass} ${isOpen ? 'popup_opened' : ''}`}
            id={`popup-${partOfId}`}
            onClick={handleOverlay}
        >
            <div className={`popup__container ${popupContainerClass}`}>
                {children}
                <button
                    onClick={onClose}
                    aria-label="Закрыть"
                    type="button"
                    className="popup__close-button"
                />
            </div>
        </div>
    );
}