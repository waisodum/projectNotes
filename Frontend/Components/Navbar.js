'use client'

import { ProfileData } from '@/Helper/Context'
import React, { useContext, useEffect, useState,onBeforeUnmount } from 'react'
import '../Styles/navbar.css'
import gsap from 'gsap'
import { FaCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function Navbar() {

  const {data,updateUserData, subjects} = useContext(ProfileData);
  const [over, setOver] = useState(false);
  const [menu, setMenu] = useState(false);
const router=useRouter()
  const dropdown = {
    width: '9vw',
    borderRadius: '0 0 0.8vw 0.8vw',
    height: '8vw',
    backgroundColor: '#5337AC',
    color: '#2a2a2a',
    borderBottom: '0.1vw solid #2a2a2a',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '0.2vw',
};

  function logout() {
    localStorage.removeItem("Token");
    updateUserData({});
    // setUserData({});
    router.push('/')
  }
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const fetchData = ()=>
    {
      setFirstName(data.firstName);
    }
    fetchData();
  }, [])
  

  useEffect(()=>
  {
    const tl = gsap.timeline();

    tl.to('.navbar', {
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
    })
  })

  return (  
    <div className='navbar'>

      <div className='innerNav'>

        
          {/* <div className='otherrr'>



          </div> */}

        
        <div className='profile'>

          <div className='profileName' onClick={()=>{setMenu(!menu)}}
          onMouseEnter={()=>{setOver(true)}} 
          onMouseLeave={()=>{setOver(false)}}
          style={menu? {borderRadius: '0.5vw 0.5vw 0 0'} : over? {backgroundColor: '#ffffff31'} : {backgroundColor: 'transparent', border: "1px solid aliceblue"}} >
            <div className='profileIcon text-[1.5vw] m-[0.2vw] inline-block w-[1.5vw] text-white'><FaCircleUser /></div>
            <h5 className='text-[1.3vw] m-[0.2vw]'> {firstName} </h5>
            <div className='downArrow text-[1.1vw] mt-[0.3vw] inline-block w-[1.5vw] text-white' style={menu? {transform: 'rotate(180deg)'} : {}}><FaAngleDown 
            style={
              menu? {transform: 'translateX(5px)'}: {}
            }
            /></div>
          </div>

          <div className='dropdown'
          style={menu ? dropdown : {display: 'none'}}>

            <Link href='/Profile' className='menuButton'>
              <h6 className='menuText'>Profile</h6>
              <div className='mIcon'><MdArrowForwardIos /></div>
            </Link>

            <button onClick={logout} className='menuButton'>
              <h5 className='menuText'>Logout</h5>
              <div className='mIcon'><HiLogout /></div>
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Navbar