'use client'

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import '../../Styles/register.css'
import { CustomEase } from 'gsap/CustomEase';
import Link from 'next/link';
import axios from 'axios';

function Register() {

const [User, setUser] = useState({
  name: "",
  Year: "",
  Branch:'',
  Email:'',
  Password:'',
});
const [first, setfirst] = useState(true)
async function HandleSubmit(e) { 
    try {
     let data= await axios.post('http://localhost:8000/',User);
     console.log(data.data);
    } catch (error) {
        console.log(error)
       setfirst(false)
    }
   
}


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
            fontSize: "3vw",
            ease: "power4.out",
            y: 0,

        })

        t1.to('.rButton', {
            delay: -0.6,
            duration: 0.2,
            width: '165px',
            height: '65px',
            fontSize: '2vw',
        })
        t1.from('form',{
            opacity:0
        })
        t1.to('form',{
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: "power1.out",
        })
  
      },[]);
      

  return first?(
   <div className='register'>

        <div className='rHeading'>

            <h2 className='firstText w-[100%] text-left'>First time?</h2> 
            <h3 className='secondText'>Join the Hub</h3>

        </div>
        <div className='form'> <form action="post" >
        <input
  type="text"
  className='form'
  placeholder='Name'
  value={User.name}
  onChange={(event) => {
    setUser({
      ...User,
      name: event.target.value,
    });
  }}
/>

<input
  type="text"
  className='form'
  placeholder='Year'
  value={User.Year}
  onChange={(event) => {
    setUser({
      ...User,
      Year: event.target.value,
    });
  }}
/>

<input
  type="text"
  className='form'
  placeholder='Branch'
  value={User.Branch}
  onChange={(event) => {
    setUser({
      ...User,
      Branch: event.target.value,
    });
  }}
/>

<input
  type="text"
  className='form'
  placeholder='Email'
  value={User.Email}
  onChange={(event) => {
    setUser({
      ...User,
      Email: event.target.value,
    });
  }}
/>
<input
  type="text"
  className='form'
  placeholder='Email'
  value={User.Password}
  onChange={(event) => {
    setUser({
      ...User,
      Password: event.target.value,
    });
  }}
/>

</form>
        </div>
        <div className='rContent'>

            <Link href='/' onClick={HandleSubmit}>
                <button className='rButton' > Register </button>
            </Link>

        </div>

    </div>
  )
  :(<div className='error'>sorry we're down</div>)
}

export default Register