import Input from '../../Components/Forms/input';
import Submit from '../../Components/Forms/submit';
import HTMLLink from '../../Components/General/Link';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <form
            className="h-screen flex flex-col justify-center items-center"
            onSubmit={e => { e.preventDefault() }}
        >
            <div
                className="text-4xl font-bold my-4"
            >
                Вход
            </div>
            <Input
                type="email"
                name="email"
                id="email"
                placeholder="Эл. почта"
            />
            <Input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
            />
            <Link to="/account">
                <Submit
                    type="submit"
                    name="submit"
                    id="submit"
                    value="Войти"
                />
            </Link>
            <div
                className="text-lg my-1"
            >
                <HTMLLink>Забыли пароль?</HTMLLink>
            </div>
            <div
                className="text-lg my-1"
            >
                Нет аккаунта? <HTMLLink>Создайте аккаунт</HTMLLink>
            </div>
            <div className="h-8"></div>
        </form>
    );
}
  
export default Login;