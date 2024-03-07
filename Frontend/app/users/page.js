"use client";
import Chat from "@/Components/chat";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setusers] = useState([]);
  const [Chatpalet, setChatpalet] = useState(false)
  const [Id, setid] = useState('')
  useEffect(() => {
    async function fetchData() {
      const token = await localStorage.getItem("Token");
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBIC_BACKEND_URL}http://localhost:8000/search?search=`,
          { headers: { Authorization: token } }
        );
        console.log(data);
       await setusers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

 async function handleClick(id) {
  
  setid((e) => {if (e == id) {setChatpalet(false);return "";} else {setChatpalet(true);return id;}});

  }
  return (
    <>
      {users.map((e) => (
        <div onClick={()=>{handleClick(e._id)}}>{e._id}</div>
      ))}
      {Chatpalet&&<Chat/>}
    </>
  );
}

export default Users;
