"use client";
import LeftMenu from "@/Components/LeftMenu";
import { ProfileData } from "@/Helper/Context";
import { useContext, useEffect, useState } from "react";
import "../../Styles/notesPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/Components/Navbar";
import MainContent from "@/Components/MainContent2";

const Page = () => {
  const { data, setdata } = useContext(ProfileData)
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentSubject, setCurrentSubject] = useState();

  const setSubject = (subject)=>
  {
    setCurrentSubject(subject);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var url =`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/protected`
        const token = localStorage.getItem("Token");
        const response = await axios.get(
          url,
          {
            headers: {
              Authorization: token,
              "Cache-Control": "no-store",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );

        setdata(response.data.UserData);
      } catch (error) {
        // Reedirect user to login page if not logged in
        console.error('Error fetching data:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Render loading state or spinner here
    return (
      <div class="reload-container">
        <div class="reload-icon"></div>
      </div>
    );
  }

  return (
    <div className="notesMain">
      {data.branch? <><Navbar name={data.firstName}/> 
       <LeftMenu currentSubject={setSubject}/> 
       <MainContent setSubject={currentSubject} URL={process.env.NEXT_PUBLIC_BACKEND_URL} /></>:null}
    </div>
  );
};

export default Page;
