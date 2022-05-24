import React from 'react';


export default function FormWithRegistrationData({ formTitle, formBtnText }) {
    return (
        <div className="auth">
            <form
                method="post"
                // onSubmit={}
                // name={}
                className="auth__form"
                noValidate
            >
                <h2 className="auth__title">{formTitle}</h2>

                <input
                    type="email"
                    minLength="7"
                    maxLength="40"
                    autoComplete="off"
                    name="name"
                    placeholder="Email"
                    // value={}
                    // onChange={}
                    required
                    className="auth__input"
                    id="authEmail"
                />

                <input
                    type="password"
                    minLength="8"
                    maxLength="40"
                    autoComplete="off"
                    name="name"
                    placeholder="Пароль"
                    // value={}
                    // onChange={}
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