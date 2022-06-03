import React, { useState, useEffect, useContext } from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';




export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onReset }) {
    const currentUser = useContext(CurrentUserContext);

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');


    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description
        });
    }


    return (
        <PopupWithForm
            isOpen={isOpen}
            partOfId="editProfile"
            onClose={onClose}
            title="Редактировать профиль"
            btnText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                minLength="2"
                maxLength="40"
                autoComplete="off"
                name="name"
                placeholder="Имя пользователя"
                value={name || ''}
                onChange={handleChangeName}
                required
                className="popup__item"
                id="popupName"
            />
            <span className="popup__item-error popupName-error"/>

            <input
                type="text"
                minLength="2"
                maxLength="200"
                autoComplete="off"
                name="about"
                placeholder="О себе"
                value={description || ''}
                onChange={handleChangeDescription}
                required
                className="popup__item"
                id="popupAboutMe"
            />
            <span className="popup__item-error popupAboutMe-error"/>
        </PopupWithForm>
    );
}