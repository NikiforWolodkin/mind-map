import React, { useState, useEffect } from 'react';
import Input from '../../Components/Forms/input';
import Submit from '../../Components/Forms/submit';
import BarSuccessful from '../../Components/Forms/barSuccessful';
import BarError from '../../Components/Forms/barError';
import HTMLLink from '../../Components/General/Link';
import { Link, Navigate } from 'react-router-dom';

function Login(props) {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const sendLoginRequest = async e => {
        e.preventDefault();
        
        props.setGlobalRegistered();

        if (email === "") {
            setError("Введите почту");
            return;
        }
        if (password === "") {
            setError("Введите пароль");
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({email, password})
            });
    
            if (!response.ok) {
                const result = await response.json();
                setError(result.type === 1 ? "Неверные данные" : "Ошибка входа");
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
            setError(null);
            props.setGlobalToken(result.token);
            props.setGlobalLoggedIn();
        }
        catch (e) {
            console.log(e);
        }
    };

    if (props.loggedIn)
    return <Navigate to="/account" />;

    return (
        <form
            className="h-screen flex flex-col justify-center items-center"
            onSubmit={sendLoginRequest}
        >
            <div className="text-4xl font-bold my-4">
                Вход
            </div>
            {props.registered === true ? <BarSuccessful text={"Аккаунт зарегистрирован"}/> : null}
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
            <Submit
                type="submit"
                name="submit"
                id="submit"
                value="Войти"
            />
            <div
                className="text-lg my-1"
            >
                Нет аккаунта? <Link to="/signup"><HTMLLink>Создайте аккаунт</HTMLLink></Link>
            </div>
            <div className="h-8"></div>
        </form>
    );
}
  
export default Login;