'use client'

import React, { useEffect, useState } from 'react'
import '../../Styles/signUpPage.css'
import SignUpForm from '@/Components/SignUpForm'
import gsap from 'gsap'

function Register() {
  const [text, setText] = useState("Sign Up");
  useEffect(()=>
  {
    const t3 = gsap.timeline();

    gsap.from('.verticalText', {
      y: '60%',
    }),

    gsap.to('.verticalText', {

      opacity: 1,
      y:0,
      duration: 1,
      ease: 'power2.ease',
    })

  }, []);

  const changeText = ()=>
  {
    setText("Join the Hub")
  }

  const changeAgain = ()=>
  {
    setText("Sign Up")
  }

  return (
    <div className='signUpBody'>

      <div className='image'></div>
      
      <h1 className='verticalText' onMouseEnter={changeText} onMouseLeave={changeAgain}>{text}</h1>

      <div className='formS'>

        <SignUpForm URL={process.env.NEXT_PUBLIC_BACKEND_URL}/>

      </div>

    </div>
  )
}

export default Register