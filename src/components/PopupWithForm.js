import React from 'react';

import Popup from './Popup';


export default function PopupWithForm({ isOpen, partOfId, onClose, children, ...props }) {
    return (
        <Popup
            isOpen={isOpen}
            partOfId={partOfId}
            onClose={onClose}
        >
            <form
                method="post"
                onSubmit={props.onSubmit}
                name={partOfId}
                className="popup__form"
            >
                <h2 className="popup__title">{props.title}</h2>
                {children}
                <button
                    aria-label={props.btnText}
                    type="submit"
                    className="popup__save-button"
                >
                    {props.btnText}
                </button>
            </form>
        </Popup>

    );
}