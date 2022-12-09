import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiFolder, FiStar } from 'react-icons/fi';
import { MdOutlineSchema } from 'react-icons/md';
import { FcMindMap } from 'react-icons/fc';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import LoadingSpinner from '../../Components/General/LoadingSpinner';
import SavingSpinner from '../../Components/General/savingSpinner';
import BarError from '../../Components/Forms/barError';
import Search from '../../Components/General/Search';
import Button from '../../Components/General/Button';
import ListElement from '../../Components/General/ListElement';
import CreateButton from '../../Components/General/CreateButton';
import MindMapPreview from '../../Components/General/MindMapPreview';
import MindMapPreviewTrashSection from '../../Components/General/MindMapPreviewTrashSection';
import useWindowDimensions from '../../useWindowDimensions';

function Account(props) {
    const { height, width } = useWindowDimensions();
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [section, setSection] = useState("recent");
    const [search, setSearch] = useState("");
    const [user, setUser] = useState("");
    const [mindMaps, setMindMaps] = useState([]);
    const navigate = useNavigate();
    

    const logOut = () => {
        props.setGlobalToken();
        props.setGlobalLoggedIn();
        navigate("/login");
    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/auth/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
            });
    
            if (!response.ok) {
                setError("Ошибка сервера");
                throw new Error(`GET error, status: ${response.status}`);
            }

            const result = await response.json();
            setUser(result.user);
            setMindMaps(result.mindMaps);
        }
        catch (e) {
            console.log(e);
        }
    };

    const addNewMindMap = async favorited => {
        setIsSaving(true);

        try {
            const response = await fetch("/api/auth/addMindMap", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
                body: JSON.stringify({favorited: favorited})
            });
    
            if (!response.ok) {
                setError("Ошибка сервера");
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
        }
        catch (e) {
            console.log(e);
        }

        await fetchData();
        setIsSaving(false);
    };

    const changeMindMap = async mindMap => {
        setIsSaving(true);

        try {
            const response = await fetch("/api/auth/changeMindMap", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
                body: JSON.stringify(mindMap)
            });
    
            if (!response.ok) {
                setError("Ошибка сервера");
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
        }
        catch (e) {
            console.log(e);
        }
        
        await fetchData();
        setIsSaving(false);
    };

    const deleteMindMap = async mindMap => {
        setIsSaving(true);

        try {
            const response = await fetch("/api/auth/deleteMindMap", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
                body: JSON.stringify(mindMap)
            });
    
            if (!response.ok) {
                setError("Ошибка сервера");
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
        }
        catch (e) {
            console.log(e);
        }
        
        await fetchData();
        setIsSaving(false);
    };

    const undoDeletes = async () => {
        setIsSaving(true);

        for (const mindMap of mindMaps) {
            const mindMapUpdated = mindMap;
            mindMapUpdated.markedForDeletion = false;

            await changeMindMap(mindMapUpdated);
        }

        setIsSaving(false);
    }

    const deleteAll = async () => {
        setIsSaving(true);

        for (const mindMap of mindMaps) {
            if (mindMap.markedForDeletion) {
                await deleteMindMap(mindMap);
            }
        }

        setIsSaving(false);
    }

    const matchesSearch = (name) => {
        if (search === "") {
            return true;
        }

        return name.toUpperCase().includes(search.toUpperCase());
    }

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
                setMindMaps(result.mindMaps.sort((a, b) => {
                    if (a.lastAccessTime > b.lastAccessTime) {
                        return -1;
                    }
                    if (a.lastAccessTime < b.lastAccessTime) {
                        return 1;
                    }

                    return 0;
                }));
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
        parseInt(width) > 600 ? <>
        {error !== null ? <div 
            className="absolute flex w-full h-0 mt-4 justify-evenly cursor-pointer"
            onClick={ () => setError(null) }
        >
            <BarError text={error} />
        </div> : null}
        {isSaving === true ? <div className="absolute flex w-full h-0 mt-4 justify-evenly">
            <SavingSpinner />
        </div> : null}
        <div className="flex h-screen">
            <div className="flex flex-col w-80 h-full border-r">
                <div className="flex items-center w-full h-14 border-gray-300 border-b text-xl">
                    <div className="ml-4">
                        {user.name}
                    </div>
                </div>
                <div onClick={ () => setSection("recent") }>
                    <ListElement
                        name="recent"
                        currentSection={section}
                        text="Последние"
                    >
                        <MdOutlineSchema />
                    </ListElement>
                </div>
                <div onClick={ () => setSection("favorited") }>
                    <ListElement 
                        name="favorited"
                        currentSection={section}
                        text="Отмеченные"
                    >
                        <FiStar />
                    </ListElement>
                </div>
                <div onClick={ () => setSection("trash") }>
                    <ListElement 
                        name="trash"
                        currentSection={section}
                        text="Корзина"
                    >
                        <FaRegTrashAlt />
                    </ListElement>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="shrink-0 flex items-center w-full h-14 border-gray-300 border-b pr-8">
                    <Search
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                        value={search}
                        setSearch={setSearch}
                    />
                    <div
                        className="ml-auto"
                        onClick={logOut}
                    >
                        <Button text="Выйти" />
                    </div>
                </div>
                <div className="flex flex-col py-4 px-2">
                    <div className="flex pb-4">
                        {section === "recent" ? <CreateButton 
                            text="Новая интеллект-карта"
                            onClick={ () => addNewMindMap(false) }
                        >
                            <FcMindMap />
                        </CreateButton> : null}
                        {section === "favorited" ? <CreateButton 
                            text="Новая интеллект-карта"
                            onClick={ () => addNewMindMap(true) }
                        >
                            <FcMindMap />
                        </CreateButton> : null}
                        {section === "trash" ? <CreateButton 
                            text="Очистить корзину"
                            onClick={deleteAll}
                        >
                            <div className="text-red-500">
                                <CgClose />
                            </div>
                        </CreateButton> : null}
                        {section === "trash" ? <CreateButton 
                            text="Восстановить все"
                            onClick={undoDeletes}
                        >
                            <div className="text-blue-600">
                                <MdRefresh />
                            </div>
                        </CreateButton> : null}
                    </div>
                    {section === "recent" ? <div className="flex flex-wrap">
                        {mindMaps.map((mindMap) => {
                            if (mindMap.markedForDeletion) {
                                return null;
                            }

                            if (!matchesSearch(mindMap.name)) {
                                return null;
                            }

                            return <MindMapPreview
                                key={mindMap._id}
                                mindMap={mindMap}
                                setMindMapId={props.setMindMapId}
                                changeMindMap={changeMindMap}
                            />
                        })}
                    </div> : null}
                    {section === "favorited" ? <div className="flex flex-wrap">
                        {mindMaps.map((mindMap) => {
                            if (mindMap.markedForDeletion) {
                                return null;
                            }
                            if (!mindMap.favorited) {
                                return null;
                            }

                            if (!matchesSearch(mindMap.name)) {
                                return null;
                            }

                            return <MindMapPreview
                                key={mindMap._id}
                                mindMap={mindMap}
                                setMindMapId={props.setMindMapId}
                                changeMindMap={changeMindMap}
                            />
                        })}
                    </div> : null}
                    {section === "trash" ? <div className="flex flex-wrap">
                        {mindMaps.map((mindMap) => {
                            if (!mindMap.markedForDeletion) {
                                return null;
                            }

                            if (!matchesSearch(mindMap.name)) {
                                return null;
                            }

                            return <MindMapPreviewTrashSection
                                key={mindMap._id}
                                mindMap={mindMap}
                                changeMindMap={changeMindMap}
                                deleteMindMap={deleteMindMap}
                            />
                        })}
                    </div> : null}
                </div>
            </div>
        </div>

        </> : <>

        {error !== null ? <div 
            className="absolute flex w-full h-0 mt-4 justify-evenly cursor-pointer"
            onClick={ () => setError(null) }
        >
            <BarError text={error} />
        </div> : null}
        {isSaving === true ? <div className="absolute flex w-full h-0 mt-4 justify-evenly">
            <SavingSpinner />
        </div> : null}
        <div className="flex h-screen">
            <div className="flex flex-col w-full">
                <div className="shrink-0 flex items-center w-full h-14 border-gray-300 border-b pr-8">
                    <Search
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                        value={search}
                        setSearch={setSearch}
                    />
                    <div
                        className="ml-auto"
                        onClick={logOut}
                    >
                        <Button text="Выйти" />
                    </div>
                </div>
                <div className="flex flex-col ">
                <div onClick={ () => setSection("recent") }>
                    <ListElement
                        name="recent"
                        currentSection={section}
                        text="Последние"
                    >
                        <MdOutlineSchema />
                    </ListElement>
                </div>
                <div onClick={ () => setSection("favorited") }>
                    <ListElement 
                        name="favorited"
                        currentSection={section}
                        text="Отмеченные"
                    >
                        <FiStar />
                    </ListElement>
                </div>
                <div
                    className="border-gray-300 border-b mb-4"
                    onClick={ () => setSection("trash") }
                >
                    <ListElement 
                        name="trash"
                        currentSection={section}
                        text="Корзина"
                    >
                        <FaRegTrashAlt />
                    </ListElement>
                </div>
                    <div className="flex flex-wrap justify-center pb-4">
                        {section === "recent" ? <CreateButton 
                            text="Новая интеллект-карта"
                            onClick={ () => addNewMindMap(false) }
                        >
                            <FcMindMap />
                        </CreateButton> : null}
                        {section === "favorited" ? <CreateButton 
                            text="Новая интеллект-карта"
                            onClick={ () => addNewMindMap(true) }
                        >
                            <FcMindMap />
                        </CreateButton> : null}
                        {section === "trash" ? <div className="mb-4"><CreateButton 
                            text="Очистить корзину"
                            onClick={deleteAll}
                        >
                            <div className="text-red-500">
                                <CgClose />
                            </div>
                        </CreateButton></div> : null}
                        {section === "trash" ? <CreateButton 
                            text="Восстановить все"
                            onClick={undoDeletes}
                        >
                            <div className="text-blue-600">
                                <MdRefresh />
                            </div>
                        </CreateButton> : null}
                    </div>
                    {section === "recent" ? <div className="flex justify-center flex-wrap">
                        {mindMaps.map((mindMap) => {
                            if (mindMap.markedForDeletion) {
                                return null;
                            }

                            if (!matchesSearch(mindMap.name)) {
                                return null;
                            }

                            return <MindMapPreview
                                key={mindMap._id}
                                mindMap={mindMap}
                                setMindMapId={props.setMindMapId}
                                changeMindMap={changeMindMap}
                            />
                        })}
                    </div> : null}
                    {section === "favorited" ? <div className="flex justify-center flex-wrap">
                        {mindMaps.map((mindMap) => {
                            if (mindMap.markedForDeletion) {
                                return null;
                            }
                            if (!mindMap.favorited) {
                                return null;
                            }

                            if (!matchesSearch(mindMap.name)) {
                                return null;
                            }

                            return <MindMapPreview
                                key={mindMap._id}
                                mindMap={mindMap}
                                setMindMapId={props.setMindMapId}
                                changeMindMap={changeMindMap}
                            />
                        })}
                    </div> : null}
                    {section === "trash" ? <div className="flex justify-center flex-wrap">
                        {mindMaps.map((mindMap) => {
                            if (!mindMap.markedForDeletion) {
                                return null;
                            }

                            if (!matchesSearch(mindMap.name)) {
                                return null;
                            }

                            return <MindMapPreviewTrashSection
                                key={mindMap._id}
                                mindMap={mindMap}
                                changeMindMap={changeMindMap}
                                deleteMindMap={deleteMindMap}
                            />
                        })}
                    </div> : null}
                </div>
            </div>
        </div>
        </>
    );
}
  
export default Account;