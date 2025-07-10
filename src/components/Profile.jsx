import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    // state for handling popup

    const [isProfile, setIsProfile] = useState(false);

    // accessing store for getting Fullname and logout fn

    const { fullName, setLogout } = useAuthStore();

    const navigate = useNavigate();

    // Storing the first letters form first and last name

    const Profile = fullName
        .split(' ')
        .map(name => name[0].toUpperCase())
        .join('');

    // logout fn

    const logOut = () => {
        setLogout();
        navigate('/');
    }


    return (
        <div onMouseLeave={() => setIsProfile(false)}>
            {/* Profile */}

            <div onClick={() => setIsProfile((prev) => !prev)}
                className='bg-secondary w-14 h-14 rounded-full mx-12 flex items-center justify-center cursor-pointer'>
                <h1 className='text-primary font-semibold text-2xl'>{Profile}</h1>
            </div>

            {/* Popup menu */}

            {
                isProfile && <div
                    className='absolute right-10 top-[69px] shadow-lg px-4 py-4 border border-slate-200 rounded-md z-10 bg-white flex flex-col gap-2 items-start'>

                    {/* fullname */}

                    <h1 className='text-lg font-semibold'>{fullName}</h1>

                    {/* Logout button */}

                    <button onClick={logOut} className='flex flex-row justify-center items-center gap-4 font-medium'><LogOutIcon size={20} /> Logout</button>
                </div>
            }

        </div>
    )
}

export default Profile