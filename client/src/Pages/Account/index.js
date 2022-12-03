import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiFolder, FiStar } from 'react-icons/fi';
import { MdOutlineSchema } from 'react-icons/md';
import { FcMindMap, FcFolder } from 'react-icons/fc';
import LoadingSpinner from '../../Components/General/LoadingSpinner';
import Search from '../../Components/General/Search';
import Button from '../../Components/General/Button';
import ListElement from '../../Components/General/ListElement';
import CreateButton from '../../Components/General/CreateButton';
import MindMapPreview from '../../Components/General/MindMapPreview';

function Account(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [showDropDown, setShowDropDown] = useState(false);
    const [user, setUser] = useState("");
    const [mindMaps, setMindMaps] = useState([]);
    const navigate = useNavigate();

    const logOut = () => {
        props.setGlobalToken();
        props.setGlobalLoggedIn();
        navigate("/login");
    };

    const addNewMindMap = async () => {
        try {
            const response = await fetch("/api/auth/addMindMap", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
                body: JSON.stringify({})
            });
    
            if (!response.ok) {
                props.setGlobalToken();
                props.setGlobalLoggedIn();
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await fetch("/api/auth/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
            });
    
            if (!response.ok) {
                props.setGlobalToken();
                props.setGlobalLoggedIn();
                throw new Error(`GET error, status: ${response.status}`);
            }

            const result = await response.json();
            setUser(result.user);
            setMindMaps(result.mindMaps);
        }
        catch (e) {
            console.log(e);
            navigate("/error");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/auth/user", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': 'Token ' +  props.token
                    }, 
                });
        
                if (!response.ok) {
                    props.setGlobalToken();
                    props.setGlobalLoggedIn();
                    throw new Error(`GET error, status: ${response.status}`);
                }
    
                const result = await response.json();
                setUser(result.user);
                setMindMaps(result.mindMaps);
                setIsLoading(false);
            }
            catch (e) {
                console.log(e);
                navigate("/error");
            }
        };
        
        fetchUser().catch(console.error);
    }, []);

    if (!props.loggedIn)
    return <Navigate to="/error" />;

    if (props.loggedIn && isLoading)
    return <LoadingSpinner />;

    if (props.loggedIn && !isLoading)
    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-80 h-full border-r">
                <div className="flex items-center w-full h-14 border-gray-300 border-b text-xl">
                    <div className="ml-4">
                        {user.email}
                    </div>
                </div>
                <ListElement text="Последние">
                    <MdOutlineSchema />
                </ListElement>
                <ListElement text="Отмеченные">
                    <FiStar />
                </ListElement>
                <ListElement text="Папки">
                    <FiFolder />
                </ListElement>
            </div>
            <div className="flex flex-col w-full">
                <div className="shrink-0 flex items-center w-full h-14 border-gray-300 border-b pr-8">
                    <Search
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                    />
                    <div
                        className="ml-auto"
                        onClick={ () => logOut() }
                    >
                        <Button text="Аккаунт" />
                    </div>
                </div>
                <div className="flex flex-col p-4">
                    <div className="flex pb-4">
                        <CreateButton 
                            text="Новая интеллект-карта"
                            onClick={addNewMindMap}
                        >
                            <FcMindMap />
                        </CreateButton>
                    </div>
                    <div className="flex flex-wrap">
                        {mindMaps.map((mindMap) => {
                            return <MindMapPreview
                                key={mindMap._id}
                                text={mindMap.name}
                                type="mind-map"
                                image={null}
                                updated="1 минуту"
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default Account;