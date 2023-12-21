'use client'

import React, { useContext, useEffect } from 'react'
import Register from '../Components/Register'
import Login from '../Components/Login'
import Link from 'next/link'
import { ProfileData } from '@/Helper/Context'
import "../Styles/globals.css"
import gsap from 'gsap'

function Home() {

  const {data, subjects} = useContext(ProfileData);

  useEffect(()=>
  {
    gsap.to('.logoLogin', {
      top: 0,
      duration: 1,
      delay: 0.5,
      ease: "expo.out",
    })
  }, []);

  return (
    <div className='body'>

      <Login />

      <div className='logoLogin'>

        <Link href='/'> <h1 className='cNone'> {data.websiteName} </h1> </Link>

      </div>
      
      <Register />

    </div>
  )
}

export default Home