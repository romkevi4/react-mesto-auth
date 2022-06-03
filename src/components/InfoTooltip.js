import React from 'react';

import iconCorrect from '../images/popup/__icon/popup__icon_correct.svg';
import iconError from '../images/popup/__icon/popup__icon_error.svg';

import Popup from './Popup';


export default function InfoTooltip({ authStatus, isOpen, onClose }) {
    return (
        <Popup
            partOfId="auth"
            isOpen={isOpen}
            onClose={onClose}
        >
            <img
                src={authStatus ? iconCorrect : iconError}
                alt="Подсказка"
                className="popup__icon"
            />
            <p className="popup__status">
                {
                    authStatus
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'
                }
            </p>
        </Popup>
    );
}