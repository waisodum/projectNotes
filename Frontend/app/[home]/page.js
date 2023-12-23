'use client'
import Navbar from "@/Components/Navbar";
import LeftMenu from "@/Components/LeftMenu";
import { ProfileData } from "@/Helper/Context";
import { useContext, useEffect } from "react";
import "../../Styles/notesPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const { setdata } = useContext(ProfileData);
  const router = useRouter();


  return (
    <div className="notesMain">
      <Navbar />
      <LeftMenu />
    </div>
  );
};

export default Page;
