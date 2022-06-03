import React from 'react';

import Popup from './Popup';


export default function PopupWithForm({
        title,
        name,
        btnText,
        isOpen,
        onClose,
        onSubmit,
        children
    }) {

    return (
            <Popup
                partOfId={name}
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    method="post"
                    onSubmit={onSubmit}
                    name={name}
                    className="popup__form"
                    noValidate
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        aria-label={btnText}
                        type="submit"
                        className="popup__save-button"
                    >
                        {btnText}
                    </button>
                </form>
            </Popup>

    );
}