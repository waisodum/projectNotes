
import React from 'react'
import '../../Styles/profile.css'
import ProfileNav from '@/Components/ProfileNav'
import ProfileBody from '@/Components/ProfileBody'


function page() {
  return (
    <div className='profileMain'>

        <ProfileNav />

        <ProfileBody/>

    </div>
  )
}

export default page