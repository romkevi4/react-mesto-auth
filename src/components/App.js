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
    const [ userData, setUserData ] = useState({});
    const [ authStatus, setAuthStatus ] = useState(false);
    const history = useHistory();


    // ---------- Управление авторизацией и регистрацией ----------
    const handleRegister = ({ password, email }) => {
        return auth.userRegistration(password, email)
            .then(() => {
                setAuthStatus(true);
                setIsAuthStatusPopupOpen(true);

                history.push('/sign-in');
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
                setIsAuthStatusPopupOpen(true);
                setAuthStatus(false);
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
                .then(res => {
                    if (res) {
                        let userData = {
                            _id: res.data._id,
                            email: res.data.email
                        }

                        setLoggedIn(true);
                        setUserData(userData);
                    }
                })
                .catch(err => {
                    console.error(`Ошибка: ${err}`);
                })
        }
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setIsAuthStatusPopupOpen(false);
        setAuthStatus(false);
        history.push('/sign-in');
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn]);


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
        setIsAuthStatusPopupOpen(false);
        setSelectedCard({});
    }
    



    // =============================== Рендеринг компонентов ===============================*
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    {/*---------- Переадресация ----------*/}
                    <Route path="/">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>

                    <Switch>
                        {/*---------- Авторизация----------*/}
                        <Route path="/sign-in">
                            <Header
                                userEmail=""
                                headerLinkClass=""
                                linkText="Регистрация"
                                goToPath="/sign-up"
                            />

                            <Login handleLogin={handleLogin}/>

                            <InfoTooltip
                                authStatus={authStatus}
                                isOpen={isAuthStatusPopupOpen}
                                onClose={closeAllPopups}
                            />
                        </Route>


                        {/*---------- Регистрация ----------*/}
                        <Route path="/sign-up">
                            <Header
                                userEmail=""
                                headerLinkClass=""
                                linkText="Войти"
                                goToPath="/sign-in"
                            />

                            <Register handleRegister={handleRegister}>
                                <p className="auth__text">
                                    Уже зарегистрированы?
                                    <Link to="/sign-in" className="auth__link">Войти</Link>
                                </p>
                            </Register>

                            <InfoTooltip
                                authStatus={authStatus}
                                isOpen={isAuthStatusPopupOpen}
                                onClose={closeAllPopups}
                            />
                        </Route>


                        {/*---------- Карточки ----------*/}
                        {/* Основные компоненты */}
                        <Route path="/">
                            <Header
                                userEmail={userData.email}
                                headerLinkClass="header__link_auth"
                                linkText="Выйти"
                                goToPath="/sign-in"
                                handleSignOut={signOut}
                            />

                            <ProtectedRoute
                                component={Main}
                                path="/"
                                loggedIn={loggedIn}
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />

                            <Footer />
                        </Route>
                    </Switch>

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
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}