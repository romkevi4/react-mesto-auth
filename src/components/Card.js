import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';




export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteBtnClassName = (
        `element__delete-button ${isOwn 
            ? 'element__delete-button_visible' 
            : 'element__delete-button_hidden'
        }`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeBtnClassName = (
        `element__like-button ${isLiked 
            ? 'element__like-button_active' 
            : 'element__like-button_inactive'
        }`
    );


    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function  handleDeleteClick() {
        onCardDelete(card);
    }


    return (
        <article className="element">
            <button
                onClick={handleClick}
                aria-label="Картинка"
                type="button"
                className="element__image-button"
            >
                <img
                    src={card.link}
                    alt={card.name}
                    className="element__image"
                />
            </button>
            <div className="element__box">
                <h2 className="element__title">
                    {card.name}
                </h2>
                <div className="element__like-info">
                    <button
                        onClick={handleLikeClick}
                        aria-label="Лайк"
                        type="button"
                        className={cardLikeBtnClassName}
                    />
                    <span name="likes" className="element__like-number">
                        {card.likes.length}
                    </span>
                </div>
            </div>
            <button
                onClick={handleDeleteClick}
                aria-label="Удалить"
                type="button"
                className={cardDeleteBtnClassName}
            />
        </article>
    );
}