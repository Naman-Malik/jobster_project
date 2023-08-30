import React from 'react'
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar,LogoutUser } from '../features/user/userSlice';
import { clearAllJobsState, clearStore } from '../features/user/allJobsSlice';

function Navbar() {
    const [showLogout,setShowLogout] = useState(false);
    const {user} = useSelector((store)=>store.user)
    const dispatch = useDispatch();

    const toggle = ()=>{
        dispatch(toggleSidebar());
    }
  return (
    <Wrapper>
        <div className='nav-center'>
            <button type='button' className='toggle-btn' onClick={toggle}>
                <FaAlignLeft/>
            </button>
            <div>
                <Logo/>
                <h3 className='logo-text'>dashboard</h3>
            </div>
            <div className='btn-container'>
                <button type='button' className='btn' onClick={()=>setShowLogout(!showLogout)}>
                    <FaUserCircle/>
                    {user?.name}
                    <FaCaretDown/>
                </button>
                <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
                    <button type='button' className='dropdown-btn' onClick={()=>dispatch(clearStore('Logout Successful...'))}>
                        logout
                    </button>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default Navbar