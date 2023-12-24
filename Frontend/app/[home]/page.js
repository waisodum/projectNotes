// ... (imports remain the same)
'use client'
import Navbar from "@/Components/Navbar";
import LeftMenu from "@/Components/LeftMenu";
import { ProfileData } from "@/Helper/Context";
import { useContext, useEffect,useState } from "react";
import "../../Styles/notesPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";


const Page = () => {
  const { setdata,data } = useContext(ProfileData);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:8000/login/protected', {
          headers: { Authorization: token , 'Cache-Control': 'no-store'}
        });

        setdata(response.data.UserData);
      } catch (error) {
        // Handle error, maybe redirect to login page
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
    return <div>Loading...</div>;
  }

  return (
    <div className="notesMain">
      <Navbar />
      {data.branch ? <LeftMenu /> : null}
    </div>
  );
};

export default Page;
