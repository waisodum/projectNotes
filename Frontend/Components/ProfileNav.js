'use client'

import React, { useContext, useState } from 'react'
import "../Styles/profileNav.css"
import { ProfileData } from '@/Helper/Context'
import Link from 'next/link'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";


function profileNav() {

    const {data, subjects} = useContext(ProfileData);

    const [menu, setMenu] = useState(false);

    const dropdown = {
        width: '9vw',
        borderRadius: '0 0 0.8vw 0.8vw',
        height: '8vw',
        backgroundColor: '#2a2a2a',
        color: '#2a2a2a',
        borderBottom: '0.1vw solid #2a2a2a',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0.2vw',
    };

  return (
    <div className='navbar'>
    
        <div className='logo'>
            {data.websiteName}
        </div>

        <div className='profile'>

          <div className='profileName' onClick={()=>{setMenu(!menu)}} 
          style={menu? {backgroundColor: "#2a2a2a", color: 'aliceblue', borderRadius: '0.5vw 0.5vw 0 0'} : {backgroundColor: '#ffffff31'}}>
            <div className='profileIcon text-[1.5vw] m-[0.2vw] inline-block w-[1.5vw] text-slate-900'><FaRegCircleUser /></div>
            <h5 className='text-[1.3vw] m-[0.2vw]'> {data.firstName} </h5>
            <div className='downArrow text-[1.1vw] mt-[0.3vw] rounded-[1vw] inline-block w-[1.5vw] text-slate-900' style={menu? {transform: 'rotate(180deg) translateX(-10px)'} : {}}><FaAngleDown 
            style={
                menu? {transform: 'translateX(16.5px)', borderRadius: '0.4vw', backgroundColor: 'aliceblue'} : {}
            }
            /></div>
          </div>

          <div className='dropdown'
          style={menu ? dropdown : {display: 'none'}}>

            <Link href='/Profile' className='menuButton'>
              <h6 className='menuText'>Notes</h6>
              <div className='mIcon'><MdArrowForwardIos /></div>
            </Link>

            <Link href='/' className='menuButton'>
              <h5 className='menuText'>Logout</h5>
              <div className='mIcon'><HiLogout /></div>
            </Link>

          </div>

        </div>

    </div>
  )
}

export default profileNav