'use client'

import React, { useContext, useEffect } from 'react'
import Register from '../Components/Register'
import Login from '../Components/Login'
import Link from 'next/link'
import { ProfileData } from '@/Helper/Context'
import "../Styles/globals.css"
import gsap from 'gsap'
import { useRouter } from 'next/navigation'


function Home() {

  const {data, subjects} = useContext(ProfileData);
  const router = useRouter();

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

      {localStorage.getItem('Token') ? router.push('/notes-sharing'): <Login />}

      <div className='logoLogin'>

        <Link href='/'> <h1 className='cNone'> Campus Chronicles </h1> </Link>

      </div>
      
      <Register />

    </div>
  )
}

export default Home