import React, { useState, useEffect } from 'react';
import Input from '../../Components/Forms/input';
import Submit from '../../Components/Forms/submit';
import HTMLLink from '../../Components/General/Link';
import { Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const sendRegistrationRequest = async e => {
        e.preventDefault();
        fetch("/api/auth/registration", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({email, password})
        }).then(response => {
            response.json();
        }).then(json => {
            console.log(json);
        });
    }

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