import React from 'react';


export default function FormWithRegistrationData({
        formTitle,
        formBtnText,
        formParams,
        onChange,
        onSubmit
    }) {

    return (
        <div className="auth">
            <form
                method="post"
                onSubmit={onSubmit}
                name="formAuth"
                className="auth__form"
                noValidate
            >
                <h2 className="auth__title">{formTitle}</h2>

                <input
                    type="email"
                    minLength="6"
                    maxLength="40"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    value={formParams.email || ''}
                    onChange={onChange}
                    required
                    className="auth__input"
                    id="authEmail"
                />

                <input
                    type="password"
                    minLength="2"
                    maxLength="40"
                    autoComplete="off"
                    name="password"
                    placeholder="Пароль"
                    value={formParams.password || ''}
                    onChange={onChange}
                    required
                    className="auth__input"
                    id="authPassword"
                />

                <button
                    aria-label={formBtnText}
                    type="submit"
                    className="auth__submit-button"
                >
                    {formBtnText}
                </button>
            </form>
        </div>
    );
}