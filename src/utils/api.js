import { authenticationData } from './initialData';


// =============================== Формирование класса Api для работы с API ===============================
class Api {
    constructor({ serverAddress }) {
        this._baseUrl = serverAddress;
        // this._token = token;
    }

    //Получение токена из localStorage
    _setToken() {
        this._token = localStorage.getItem('token');
    }

    // Проверка ответа сервера
    _processResponseData(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Что-то пошло не так, ошибка: ${res.status}`);
    }

    // Запрос получения данных пользователя с сервера
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this._token}`
            },
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

    // Запрос сохранения измененных данных пользователя
    saveUserData(objectWithUserData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: objectWithUserData.name,
                about: objectWithUserData.about
            }),
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

    // Запрос сохранения измененных аватара пользователя
    saveUserAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl
            }),
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

    // Запрос получения карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this._token}`
            },
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

    // Запрос сохранения новой карточки на сервере
    saveNewCard(objectWithCardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: objectWithCardData.name,
                link: objectWithCardData.link
            }),
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

    // Запрос удаления карточки с сервера
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`
            },
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

    // Запрос на постановку лайка карточки
    addLikeOfCard(cardId, user) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                likes: user
            }),
            credentials: 'include'
        })
            .then(this._processResponseData);
    }

// Запрос на снятие лайка с карточки
    removeLikeOfCard(cardId, user) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                likes: user
            }),
            credentials: 'include'
        })
            .then(this._processResponseData);
    }
}

// Запросы серверу
export const api = new Api(authenticationData);