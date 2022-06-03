import React, { useState } from 'react';

import FormWithRegistrationData from './FormWithRegistrationData';


export default function Login({ handleLogin }) {
    const [ formParams, setFormParams ] = useState({
        password: '',
        email: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormParams((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLogin(formParams);
    }

    return (
        <FormWithRegistrationData
            formTitle="Вход"
            formBtnText="Войти"
            formParams={formParams}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}