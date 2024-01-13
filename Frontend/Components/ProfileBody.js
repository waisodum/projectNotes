'use client'

import React, { useContext, useEffect, useState } from 'react'
import "../Styles/profile.css"
import { ProfileData } from '@/Helper/Context'
// import gsap from 'gsap'
import Image from 'next/image';
import Link from 'next/link';
import UploadArea from './UploadArea';


function ProfileBody({token}) {

    const {data, updateUserData} = useContext(ProfileData);

    const [newUserData, setNewUserData] = useState({...data});

    const greetings = ["Heyy,", "Hello,", "Kasa kay?"];

    const [greet, setGreet] = useState('');

    const [dayGreet, setDayGreet] = useState('');

    useEffect(()=>
    { 
        // console.log(token);
        const time = new Date();
        const hour = time.getHours();

        if(hour > 4 && hour < 12)
            setDayGreet("Good Morning");
        else if (hour >= 12 && hour <= 17)
            setDayGreet("Good Afternoon");
        else
            setDayGreet("Good Evening");
    },[]);

    useEffect(()=>
    {
        const index = Math.floor(Math.random() * greetings.length);
        setGreet(greetings[index]);   
    },[]);

    const handleChanges = (e)=>
    {
        const {name, value} = e.target;
        setNewUserData(prevData => ({
            ...prevData,
            [name] : value,
        }))
    };

    const handleSubmit = (e)=>
    {
        e.preventDefault();
        updateUserData(newUserData);
    };

  return (
    <div className='profileBody'>

        <div className='hero'>

            <div className='heroText'>

                <h1 className='text-[3vw] font-bold'> {greet} {data.firstName} !</h1>
                <div className='dayGreet'>
                    <h1 className='text-[2.7vw] m-[0.5vw] font-semibold'> {dayGreet} </h1>
                    
                    <div className='dayIcon' 
                    // style={{ width: '4.5vw', height: '3.5vw',background: `url(${dayGreet === "Good Morning" ? '/morningRes.png' :
                    // dayGreet === "Good Afternoon" ? '/afternoon.png' :
                    // '/evening.png'}) no-repeat`, 
                    // backgroundSize: 'contain'}}
                    >
                        
                        <Image src={dayGreet === "Good Morning" ? '/morningRes.png' : dayGreet === "Good Afternoon" ? '/afternoon.png' : '/evening.png'} 
                        alt='Morning' height={45} width={45} />

                    </div>

                </div>

                <div className='w-[50%] flex items-center justify-center'>

                    <div className='heroInfo'>

                        @{data.username} &bull; {data.year} &bull; {data.branch} <br/>
                        {data.email}

                    </div>

                </div>

            </div>

            <div className='updateDetails'>

                <form className='updateForm'>

                    <div className='formRow'>

                        <h4 className='field'> First Name </h4>

                        <input type='text' name="firstName" value={newUserData.firstName} placeholder="First Name" 
                        onChange={handleChanges} required/>


                    </div>
                    

                    <div className='formRow'>

                        <h4 className='field'> Last Name </h4>

                        <input type='text' name="lastName" value={newUserData.lastName} placeholder="Last Name" 
                        onChange={handleChanges} required/>

                    </div>

                    <div className='formRow'>

                        <h4 className='field'> Email </h4>

                        <input type='email' name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={newUserData.email} placeholder="E-mail" onChange={handleChanges} required/>

                    </div>

                    <button className='updateBtn m-[1vw]' onClick={handleSubmit}>Update</button>

                </form>

            </div>

        </div>

        <div className='updateSection'>

            <button className='uploadCard'>
                <h1 className='text-[1.45vw] font-bold'> Your Data </h1>
                <div className='uploadData'>

                    <div className='dataRow'>
                        <h4>Likes :&nbsp;</h4><h4 className='text-[1.3vw] font-bold'> {data.likes} </h4>
                    </div>

                    <div className='dataRow'>
                        <h4>Notes Uploaded :&nbsp;</h4><h4 className='text-[1.3vw] font-bold'> {data.uploadCount} </h4>
                    </div>

                    <div className='dataRow'>
                        <h4>Downloads :&nbsp;</h4><h4 className='text-[1.3vw] font-bold'> {data.downloads} </h4>
                    </div>

                </div>

                <Link href='/uploads' className='uploadsBtn'>
                    Your Uploads
                </Link>
            </button>

            <UploadArea token={token}/>

        </div>

    </div>
  )
}

export default ProfileBody