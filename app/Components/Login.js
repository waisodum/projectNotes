'use client'

import React, { useEffect } from 'react'
import '../../Styles/login.css'
import gsap from 'gsap'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

function Login() {

    useEffect(()=>
    {

        const t2 = gsap.timeline();

        gsap.from('.login' , {
            opacity: 0,
            duration: 2
        }),

        gsap.to('.login', {
            opacity: 1,
            duration: 2,
            delay: 0.34,
            ease: "power1.out",
            onComplete: function () {
              setTimeout(() => {
                gsap.set('.login', {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                });
              }, 1);
            },
          });

    }, []);

  return (
    <div className='login'>
        
        <h1 className='lHeading'>
            Sign In
        </h1>

        <div className='loginMethods'>

            <Link href='/' className='methodLink'>
                <div className='methodIcon'><FcGoogle /></div> <h2 className='methodName'>Google</h2>
            </Link>
        </div>

    </div>
  )
}

export default Login