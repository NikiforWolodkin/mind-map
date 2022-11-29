import HTMLLink from '../../Components/General/Link';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div
            className="h-screen flex flex-col justify-center items-center"
        >
            <img src="https://static.thenounproject.com/png/1179217-200.png" />
            <div
                className="text-4xl font-bold"
            >
                Ошибка!
            </div>
            <div
                className="text-lg my-1"
            >
                Страница не существует или у вас недостаточно прав. <Link to="/login"><HTMLLink>На главную</HTMLLink></Link>
            </div>
        </div>
    );
}
  
export default Error;