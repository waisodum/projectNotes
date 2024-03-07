'use client'
import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/profile.css'
import ProfileNav from '@/Components/ProfileNav'
import ProfileBody from '@/Components/ProfileBody'
import { ProfileData } from "@/Helper/Context";
import { useRouter } from 'next/navigation'
import axios from "axios";


function page() {



  const { setdata,data } = useContext(ProfileData);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
const [Token, setToken] = useState()
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        setToken(token)
        const response = await axios.get('http://localhost:8000/login/protected', {
          headers: { Authorization: token , 'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',}
        });

        setdata(response.data.UserData);
      } catch (error) {

        // console.error('Error fetching data:', error);
         router.push('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {

    return<div class="reload-container">
    <div class="reload-icon"></div>
  </div>
  
  
  ;
  }


  return (
    <div className='profileMain'>

        {data.branch?<ProfileNav />: router.push('/')}

        {data.branch?<ProfileBody token={Token} />:null}

    </div>
  )
}

export default page