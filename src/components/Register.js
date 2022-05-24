import React from 'react';

import FormWithRegistrationData from './FormWithRegistrationData';


export default function Register({ children }) {
    return (
        <>
            <FormWithRegistrationData formTitle="Регистрация" formBtnText="Зарегистрироваться" />
            {children}
        </>
    );
}