import React, { useState, useEffect } from 'react';
import Input from '../../Components/Forms/input';
import Submit from '../../Components/Forms/submit';
import BarSuccessful from '../../Components/Forms/barSuccessful';
import HTMLLink from '../../Components/General/Link';
import { Link, Navigate } from 'react-router-dom';
import BarError from '../../Components/Forms/barError';

function Signup(props) {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [registered, setRegistered] = useState(false);

    const sendRegistrationRequest = async e => {
        e.preventDefault();

        if (email === "") {
            setError("Введите почту");
            return;
        }
        if (password === "") {
            setError("Введите пароль");
            return;
        }
        if (password !== passwordRepeat) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const response = await fetch("/api/auth/registration", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({email, password})
            });
    
            if (!response.ok) {
                const result = await response.json();
                setError(result.type === 1 ? "Почта уже используется" : "Ошибка регистрации");
                throw new Error(`POST error, status: ${response.status}`);
            }

            props.setGlobalRegistered();
            setRegistered(true);
            setError(null);
        }
        catch (e) {
            console.log(e);
        }
    }

    if (props.loggedIn)
    return <Navigate to="/account" />;

    if (registered)
    return <Navigate to="/login" />;

    return (
        <form
            className="h-screen flex flex-col justify-center items-center"
            onSubmit={sendRegistrationRequest}
        >
            <div
                className="text-4xl font-bold my-4"
            >
                Регистрация
            </div>
            {error !== null ? <BarError text={error} /> : null}
            <Input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Эл. почта"
                onChange={ e => setEmail(e.target.value) }
            />
            <Input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Пароль"
                onChange={ e => setPassword(e.target.value) }
            />
            <Input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                value={passwordRepeat}
                placeholder="Повторите пароль"
                onChange={ e => setPasswordRepeat(e.target.value) }
            />
            <Submit
                type="submit"
                name="submit"
                id="submit"
                value="Регистрация"
            />
            <div
                className="text-lg my-1"
            >
                Уже есть аккаунт? <Link to="/login"><HTMLLink>Войдите</HTMLLink></Link>
            </div>
            <div className="h-8"></div>
        </form>
    );
}
  
export default Signup;