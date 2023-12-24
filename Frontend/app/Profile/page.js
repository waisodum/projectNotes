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

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:8000/login/protected', {
          headers: { Authorization: token , 'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',}
        });

        setdata(response.data.UserData);
      } catch (error) {
        // Handle error, maybe redirect to login page
        // console.error('Error fetching data:', error);
         router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Render loading state or spinner here
    return<div class="reload-container">
    <div class="reload-icon"></div>
  </div>
  
  
  ;
  }


  return (
    <div className='profileMain'>

        {data.branch?<ProfileNav />:null}

        {data.branch?<ProfileBody/>:null}

    </div>
  )
}

export default page