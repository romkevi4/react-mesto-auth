import React, { useContext } from 'react';

import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';




export default function Main({
        cards,
        onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick,
        onCardLike,
        onCardDelete
    }) {
    const currentUser = useContext(CurrentUserContext);


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__card">
                    <button
                        aria-label="Аватар"
                        type="button"
                        onClick={onEditAvatar}
                        className="profile__avatar-btn"
                    >
                        <img
                            src={currentUser.avatar}
                            alt="Аватар"
                            className="profile__avatar"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__box">
                            <h1 className="profile__name">
                                {currentUser.name}
                            </h1>
                            <button
                                aria-label="Редактировать"
                                type="button"
                                onClick={onEditProfile}
                                className="profile__edit-button"
                            >
                            </button>
                        </div>
                        <p className="profile__about-me">
                            {currentUser.about}
                        </p>
                    </div>
                </div>
                <button
                    aria-label="Добавить"
                    type="button"
                    onClick={onAddPlace}
                    className="profile__add-button"
                >
                </button>
            </section>

            <section className="elements">
                {
                    cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                                key={card._id}
                            />
                        );
                    })
                }
            </section>
        </main>
    );
}