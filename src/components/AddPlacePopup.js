import React, { useState, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';




export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [ nameCard, setNameCard ] = useState('');
    const [ linkCard, setLinkCard ] = useState('');


    function handleChangeNameCard(evt) {
        setNameCard(evt.target.value);
    }

    function handleChangeLinkCard(evt) {
        setLinkCard(evt.target.value);
    }

    useEffect(() => {
        setNameCard('');
        setLinkCard('');
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: nameCard,
            link: linkCard,
        });
    }


    return (
        <PopupWithForm
            isOpen={isOpen}
            partOfId="addCard"
            onClose={onClose}
            title="Новое место"
            btnText="Создать"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                minLength="2"
                maxLength="30"
                autoComplete="off"
                name="title"
                placeholder="Название"
                value={nameCard || ''}
                onChange={handleChangeNameCard}
                required
                className="popup__item"
                id="popupTitle"
            />
            <span className="popup__item-error popupTitle-error"/>

            <input
                type="url"
                autoComplete="off"
                name="link"
                placeholder="Ссылка на картинку"
                value={linkCard || ''}
                onChange={handleChangeLinkCard}
                required
                className="popup__item"
                id="popupLink"
            />
            <span className="popup__item-error popupLink-error"/>
        </PopupWithForm>
    );
}