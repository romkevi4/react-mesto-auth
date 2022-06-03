import React from 'react';

import iconCorrect from '../images/popup/__icon/popup__icon_correct.svg';
import iconError from '../images/popup/__icon/popup__icon_error.svg';

import Popup from './Popup';


export default function InfoTooltip({ isOpen, partOfId, onClose, ...props }) {
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            partOfId={partOfId}
        >
            <img
                src={props.authStatus ? iconCorrect : iconError}
                alt="Подсказка"
                className="popup__icon"
            />
            <p className="popup__status">
                {
                    props.authStatus
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'
                }
            </p>
        </Popup>
    );
}