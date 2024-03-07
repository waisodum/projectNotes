'use client'
import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/profile.css'
import ProfileNav from '@/Components/ProfileNav'
import ProfileBody from '@/Components/ProfileBody'
import { ProfileData } from "@/Helper/Context";
import { useRouter } from 'next/navigation'
import axios from "axios";
import ResposiveNav from '@/Components/resposiveNav'

function page() {
  const { setdata,data } = useContext(ProfileData);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  

const [Token, setToken] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url=process.env.NEXT_PUBLIC_BACKEND_URL
        const token = localStorage.getItem('Token');
        setToken(token)
        const response = await axios.get(`${url}/login/protected`, {
          headers: { Authorization: token , 'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',}
        });

        setdata(response.data.UserData);
      } catch (error) {
      setdata({})
      localStorage.removeItem("Token");
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
{1?<div>
        {data.branch?<ProfileNav name={data.firstName}/>: router.push('/')}

        {data.branch?<ProfileBody token={Token} />:null}
</div>:<>
<div>
       
       {data.branch?<ResposiveNav/>: router.push('/')}
       
        {/* {data.branch?<ProfileNav name={data.firstName}/>: router.push('/')} */}

        {/* {data.branch?<ProfileBody token={Token} />:null} */}
</div>
</>}
    </div>
  )
}

export default page