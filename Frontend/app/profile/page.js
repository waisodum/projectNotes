'use client'
import Navbar from "@/Components/Navbar";
// import Leftupload from "@/Components/Leftupload";
import Uploadsection from "@/Components/Uploadsection";

import "../../Styles/notesPage.css"
import React, { useEffect, useState } from 'react'






const profile = () => {
  return (
    <div className='notesMain'>
        <Navbar />
        <Uploadsection />
        

      
    </div>
  )
}

export default profile
