import Input from '../../Components/Forms/input';
import Submit from '../../Components/Forms/submit';
import HTMLLink from '../../Components/General/Link';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <form
            className="h-screen flex flex-col justify-center items-center"
            onSubmit={e => { e.preventDefault() }}
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
                placeholder="Эл. почта"
            />
            <Input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
            />
            <Input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                placeholder="Повторите пароль"
            />
            <Link to="/account">
                <Submit
                    type="submit"
                    name="submit"
                    id="submit"
                    value="Регистрация"
                />
            </Link>
            <div
                className="text-lg my-1"
            >
                Уже есть аккаунт? <Link to="/"><HTMLLink>Войдите</HTMLLink></Link>
            </div>
            <div className="h-8"></div>
        </form>
    );
}
  
export default Signup;