import React from 'react';

import FormWithRegistrationData from './FormWithRegistrationData';


export default function Register() {
    return (
        <>
            <FormWithRegistrationData formTitle="Регистрация" formBtnText="Зарегистрироваться" />
            <p>
                Уже зарегистрированы?
                <link to="">Войти</link>
            </p>
        </>
    );
}