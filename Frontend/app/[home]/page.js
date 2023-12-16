'use client'

import Navbar from "@/Components/Navbar";
import LeftMenu from "@/Components/LeftMenu";
// import { ProfileData } from "@/Helper/Context";
import { useContext, useEffect, useState } from "react";
import "../../Styles/notesPage.css"


const page = ({params}) => {

  
  // const gloData = useContext(MyContext);

  return (
    <div className="notesMain">

    <Navbar />

    <LeftMenu />
       
    </div>
  )
}

export default page;
    