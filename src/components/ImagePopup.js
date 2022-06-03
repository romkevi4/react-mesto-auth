import React from 'react';

import Popup from './Popup';


export default function ImagePopup({
        isOpen,
        partOfId,
        onClose,
        popupClass,
        popupContainerClass,
        ...props
    }) {

    return (
        <Popup
            isOpen={props.card.link}
            partOfId="image"
            onClose={onClose}
            popupClass={popupClass}
            popupContainerClass={popupContainerClass}
            card={props.card}
        >
            <img
                src={props.card.link}
                alt={props.card.name}
                className="popup__image"
            />
            <p className="popup__text">
                {props.card.name}
            </p>
        </Popup>
    );
}