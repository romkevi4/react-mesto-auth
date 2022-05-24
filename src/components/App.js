import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { api } from '../utils/api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from "./Register";




export default function App() {
    //=============================== Взаимодействие компонентов ===============================
    // ---------- Переменные состояния ----------
    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);


    // ---------- Управление данными пользователя ----------
    useEffect(() => {
        api.getUserData()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }, []);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleUpdateUser = (objectWithUserData) => {
        saveUserInfo({
            apiRequest: api.saveUserData(objectWithUserData)
        });
    }

    const handleUpdateAvatar = (objectWithAvatarData) => {
        saveUserInfo({
            apiRequest: api.saveUserAvatar(objectWithAvatarData.avatar.value)
        });
    }

    function saveUserInfo({
            apiRequest
        }) {
        return apiRequest
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }


    // ---------- Управление данными карточек ----------
    useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }, []);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            selectRequest({
                apiRequest: api.addLikeOfCard(card._id, currentUser),
                cardData: card
            });
        } else {
            selectRequest({
                apiRequest: api.removeLikeOfCard(card._id, currentUser),
                cardData: card
            });
        }
    }

    function selectRequest({
            apiRequest,
            cardData
        }) {
        return apiRequest
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === cardData._id ? newCard : c));
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }

    const handleCardDelete = (card) => {
        const isOwn = card.owner._id === currentUser._id;

        if (isOwn) {
            api.deleteCard(card._id)
                .then(() => {
                    setCards((state) => state.filter((c) => c.owner._id !== currentUser._id));
                })
                .catch(err => {
                    console.error(`Ошибка: ${err}`);
                });
        }
    }

    const handleAddPlaceClick  = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (cardObject) => {
        setSelectedCard(cardObject);
    }

    const handleAddPlaceSubmit = (objectWithCardData) => {
        api.saveNewCard(objectWithCardData)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }


    // ---------- Управление попапами ----------
    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }




    // =============================== Рендеринг компонентов ===============================*
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Switch>
                        {/*---------- Регистрация----------*/}
                        <Route path="/"> {/*TODO: нужно вернуть /sign-up*/}
                            <Header
                                userEmail=""
                                headerLinkClass=""
                                linkText="Регистрация"
                            />
                            <Login />
                        </Route>


                        {/*---------- Авторизация ----------*/}
                        <Route path="/asdasd">
                            <Header
                                userEmail=""
                                headerLinkClass=""
                                linkText="Войти"
                            />
                            <Register>
                                <p className="auth__text">
                                    Уже зарегистрированы?
                                    <Link to="/" className="auth__link">Войти</Link>
                                </p>
                            </Register>

                        </Route>


                        {/*---------- Основные компоненты ----------*/}
                        <Route path="/sign-up"> {/* TODO: Нужно исправить путь */}
                            <Header />
                            <Main
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                            <Footer />


                            {/* Попапы */}
                            <EditProfilePopup
                                isOpen={isEditProfilePopupOpen}
                                onClose={closeAllPopups}
                                onUpdateUser={handleUpdateUser}
                            />
                            <EditAvatarPopup
                                isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}
                                onUpdateAvatar={handleUpdateAvatar}
                            />
                            <AddPlacePopup
                                isOpen={isAddPlacePopupOpen}
                                onClose={closeAllPopups}
                                onAddPlace={handleAddPlaceSubmit}
                            />
                            <PopupWithForm
                                title="Вы уверены?"
                                name="deleteCard"
                                btnText="Да"
                                onClose={closeAllPopups}
                            />
                            <ImagePopup
                                card={selectedCard}
                                onClose={closeAllPopups}
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}