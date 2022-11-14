import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiStar } from 'react-icons/fi';
import { MdOutlineSchema } from 'react-icons/md';
import { FcMindMap, FcFolder } from 'react-icons/fc';
import Search from '../../Components/General/Search';
import DropDown from '../../Components/General/DropDown';
import ListElement from '../../Components/General/ListElement';
import CreateButton from '../../Components/General/CreateButton';
import MindMapPreview from '../../Components/General/MindMapPreview';

function Account() {
    const [user, setUser] = useState("");
    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            user => {
                setUser(user)
            }
        )
    }, [])

    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-80 h-full border-r">
                <div className="flex items-center w-full h-14 border-gray-300 border-b text-xl">
                    <div className="ml-4">
                        {user.userName}
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
                <div className="flex items-center w-full h-14 border-gray-300 border-b pr-8">
                    <Search
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                    />
                    <Link 
                        className="ml-auto"
                        to="/"
                    >
                        <DropDown />
                    </Link>
                </div>
                <div className="flex flex-col p-4">
                    <div className="flex pb-4">
                        <CreateButton text="Новая интеллект-карта">
                            <FcMindMap />
                        </CreateButton>
                        <CreateButton text="Новая папка">
                            <FcFolder />
                        </CreateButton>
                    </div>
                    <div className="flex">
                        <MindMapPreview
                            text="Интеллект-карта"
                            type="mind-map"
                            image="https://www.mindmapping.com/img/mind-map-example-empathy.png"
                            updated="1 день"
                        />
                        <MindMapPreview
                            text="Папка"
                            type="folder"
                            image={null}
                            updated="3 дня"
                        />
                        <MindMapPreview
                            text="Интеллект-карта"
                            type="mind-map"
                            image={null}
                            updated="1 месяц"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default Account;