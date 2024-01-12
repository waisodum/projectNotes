
'use client'
import LeftMenu from "@/Components/LeftMenu";
import { ProfileData } from "@/Helper/Context";
import { useContext, useEffect,useState } from "react";
import "../../Styles/notesPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/Components/Navbar";


const Page = () => {
  const { data, setdata } = useContext(ProfileData);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:8000/login/protected', {
          headers: { Authorization: token ,   'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',}
        });

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
    //Spinner hai ye
    return <div class="reload-container">
    <div class="reload-icon"></div>
  </div>;
  }

  return (
    <div className="notesMain">
      {data.branch ? <Navbar /> : null}
      {data.branch ? <LeftMenu /> : null}
      {localStorage.getItem("Token")? <MainContent />: router.push}

    </div>
  );
};

export default Page;
