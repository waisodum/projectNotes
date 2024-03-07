'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import '../Styles/register.css'
import { CustomEase } from 'gsap/CustomEase';
import Link from 'next/link';

function Register() {

    useEffect(()=>{

        const t1 = gsap.timeline();
        
        t1.from(".register", {
            x: '0',
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
            fontSize: "3vw",
            ease: "power4.out",
            y: 0,

        })

        t1.to('.RegPara', {
            opacity: 1,
            duration: 0.5,
            delay: -0.5,
        })

        t1.to('.rButton', {
            delay: -0.6,
            duration: 0.2,
            width: '165px',
            height: '65px',
            fontSize: '2vw',
        })
          
    
      },[]);

  return (
    <div className='register'>

        <div className='rHeading'>

            <h2 className='firstText w-[100%] text-[3vw] text-left'>First time?</h2> 
            <h3 className='secondText text-[3.6vw]'>Join the Hub</h3>

            <p className='RegPara'>– the ultimate hangout for college squad. Let's share, and groove together!</p>  

        </div>

        <div className='rContent'>

            <Link href='/Register'>
                <button className='rButton'> Register </button>
            </Link>
         

        </div>

    </div>
  )
}

export default Register
