'use client'

import React, { useContext, useEffect, useState } from 'react'
import "../Styles/profile.css"
import { ProfileData } from '@/Helper/Context'

function ProfileBody() {

    const {data, subjects} = useContext(ProfileData);

    const greetings = ["Heyy,", "Hello,"];

    const [greet, setGreet] = useState('');

    useEffect(()=>
    {
        const index = Math.floor(Math.random() * greetings.length);
        setGreet(greetings[index]);   
    })

  return (
    <div className='profileBody'>

        <div className='hero'>

            <div className='heroText'>

                <h1 className='text-[3vw] font-bold'> {greet} {data.firstName} !</h1>

            </div>

        </div>

    </div>
  )
}

export default ProfileBody