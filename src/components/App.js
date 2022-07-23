import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';

import { api } from '../utils/api';
import { auth } from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';




export default function App() {
    //=============================== Взаимодействие компонентов ===============================
    // ---------- Переменные состояния ----------
    const [ currentUser, setCurrentUser ] = useState({});

    const [ cards, setCards ] = useState([]);
    const [ selectedCard, setSelectedCard ] = useState({});

    const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
    const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
    const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
    const [ isAuthStatusPopupOpen, setIsAuthStatusPopupOpen ] = useState(false);

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ authStatus, setAuthStatus ] = useState(false);
    const history = useHistory();


    // ---------- Управление авторизацией и регистрацией ----------
    const handleRegister = ({ password, email }) => {
        return auth.userRegistration(password, email)
            .then(() => {
                setAuthStatus(true);
                history.push('/signin');
            })
            .catch(err => {
                setAuthStatus(false);
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsAuthStatusPopupOpen(true);
            });
    }

    const handleLogin = ({ password, email }) => {
        return auth.userAuthorization(password, email)
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    tokenCheck();
                }
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }

    function tokenCheck() {
        let token = localStorage.getItem('token');

        if (token) {
            auth.validityCheck(token)
                .then(res => res.data)
                .then(data => {
                    if (data) {
                        let userData = {
                            _id: data._id,
                            email: data.email
                        }

                        setLoggedIn(true);
                        setCurrentUser(userData);
                    }
                })
                .catch(err => {
                    console.error(`Ошибка: ${err}`);
                });
        }
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setIsAuthStatusPopupOpen(false);
        setAuthStatus(false);
        history.push('/signin');
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            api._setToken();

            Promise.all([api.getUserData(), api.getInitialCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData.data);
                    setCards(cardsData.data);
                })
                .catch(err => {
                    console.error(`Ошибка: ${err}`);
                });
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn, history]);


    // ---------- Управление данными пользователя ----------
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
            .then(res => res.data)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }


    // ---------- Управление данными карточек ----------
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(id => id === currentUser._id);

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
            .then(res => res.data)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === cardData._id ? newCard : c));
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
    }

    const handleCardDelete = (card) => {
        const isOwn = card.owner === currentUser._id;

        if (isOwn) {
            api.deleteCard(card._id)
                .then(res => res.data)
                .then(() => {
                    setCards((state) => state.filter((c) => c._id !== card._id));
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
            .then(res => res.data)
            .then(data => {
                setCards([...cards, data]);
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
        setIsAuthStatusPopupOpen(false);
        setSelectedCard({});
    }





    // =============================== Рендеринг компонентов ===============================*
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Switch>
                        {/*---------- Авторизация----------*/}
                        <Route path="/signin">
                            <Header
                                userEmail=""
                                headerLinkClass=""
                                linkText="Регистрация"
                                goToPath="/signup"
                            />

                            <Login handleLogin={handleLogin} />

                            <InfoTooltip
                                isOpen={isAuthStatusPopupOpen}
                                partOfId="auth-in"
                                onClose={closeAllPopups}
                                authStatus={authStatus}
                            />
                        </Route>


                        {/*---------- Регистрация ----------*/}
                        <Route path="/signup">
                            <Header
                                userEmail=""
                                headerLinkClass=""
                                linkText="Войти"
                                goToPath="/signin"
                            />

                            <Register handleRegister={handleRegister}>
                                <p className="auth__text">
                                    Уже зарегистрированы?
                                    <Link to="/signin" className="auth__link">Войти</Link>
                                </p>
                            </Register>

                            <InfoTooltip
                                isOpen={isAuthStatusPopupOpen}
                                partOfId="auth-up"
                                onClose={closeAllPopups}
                                authStatus={authStatus}
                            />
                        </Route>


                        {/*---------- Основные компоненты ----------*/}
                        <ProtectedRoute
                            path="/"
                            loggedIn={loggedIn}
                            cards={cards}
                        >
                            <Header
                                userEmail={currentUser.email}
                                headerLinkClass="header__link_auth"
                                linkText="Выйти"
                                goToPath="/signin"
                                handleSignOut={signOut}
                            />

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
                        </ProtectedRoute>


                        {/*---------- Переадресация ----------*/}
                        <Route path="/">
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                        </Route>
                    </Switch>

                    {/*---------- Попапы ----------*/}
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
                        partOfId="deleteCard"
                        title="Вы уверены?"
                        btnText="Да"
                        onClose={closeAllPopups}
                    />

                    <ImagePopup
                        onClose={closeAllPopups}
                        popupClass="popup_opacity"
                        popupContainerClass="popup__container_size_big"
                        card={selectedCard}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}