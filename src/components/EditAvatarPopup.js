import React, { useRef } from 'react';

import PopupWithForm from './PopupWithForm';




export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();


    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current
        });
    }


    return (
        <PopupWithForm
            title="Обновить аватар"
            name="editAvatar"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                autoComplete="off"
                name="avatar"
                placeholder="Ссылка на аватар профиля"
                ref={avatarRef}
                required
                className="popup__item"
                id="popupLinkAvatar"
            />
            <span className="popup__item-error popupLinkAvatar-error"/>
        </PopupWithForm>
    );
}