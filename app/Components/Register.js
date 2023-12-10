'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import '../../Styles/register.css'
import { CustomEase } from 'gsap/CustomEase';
import Link from 'next/link';

function Register() {

    useEffect(()=>{

        const t1 = gsap.timeline();
        
        t1.from(".register", {
            x: '0',
            position: null,
        })

        t1.to('.register', {
            x: '-200%',
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
        })

        t1.from('.rHeading', {
            fontSize: '5.5vw',
            y: '50%',
        })

        t1.to('.rHeading', {
            duration: 0.5,
            delay: 0.5,
            fontSize: "2.5vw",
            ease: "power4.out",
            y: 0,

        })
          
    
      },[]);

  return (
    <div className='register'>

        <div className='rHeading'>

            <h2 className='firstText w-[100%] text-left'>First time?</h2> 
            <h3 className='secondText'>Join the Hub</h3>

        </div>

        <div className='rContent'>

            <Link href='/'>
                <button className='rButton'> Register </button>
            </Link>

        </div>

    </div>
  )
}

export default Register