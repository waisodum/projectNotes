"use client";

import React, { useContext, useEffect, useState } from "react";
import "../Styles/profile.css";
import { ProfileData } from "@/Helper/Context";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import gsap from "gsap";
import { useRouter } from "next/navigation";

function profileNav() {
  const { data, subjects, updateUserData } = useContext(ProfileData);

  const [userData, setUserData] = useState(data);
  const [firstName, setfirstName] = useState(data.firstName)
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const dropdown = {
    width: "9vw",
    borderRadius: "0 0 0.8vw 0.8vw",
    height: "8vw",
    backgroundColor: "#2a2a2a",
    color: "#2a2a2a",
    borderBottom: "0.1vw solid #2a2a2a",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    padding: "0.2vw",
  };

  useEffect(() => {
 
    gsap.to(".logo", {
      opacity: 1,
      duration: 0.2,
      delay: 0.5,
    });

    gsap.to(".profile", {
      opacity: 1,
      duration: 0.2,
    });
  }, []);
  function logout() {
    localStorage.removeItem("Token");
    updateUserData({});
    setUserData({});
    router.push("/");
  }
  return (
    <div className="navbar">
      <Link href="/" className="logo">
        Campus Chronicles
      </Link>

      <div className="profile">
        <div
          className="profileName"
          onClick={() => {
            setMenu(!menu);
          }}
          style={
            menu
              ? {
                  backgroundColor: "#2a2a2a",
                  color: "aliceblue",
                  borderRadius: "0.5vw 0.5vw 0 0",
                }
              : { backgroundColor: "#ffffff31" }
          }
        >
          <div className="profileIcon text-[1.5vw] m-[0.2vw] inline-block w-[1.5vw] text-slate-900">
            <FaRegCircleUser style={menu ? { color: "aliceblue" } : {}} />
          </div>
          <h5 className="text-[1.3vw] m-[0.2vw]"> {firstName} </h5>
          <div
            className="downArrow text-[1.1vw] mt-[0.3vw] rounded-[1vw] inline-block w-[1.5vw] text-slate-900"
            style={
              menu ? { transform: "rotate(180deg) translateX(-10px)" } : {}
            }
          >
            <FaAngleDown
              style={
                menu
                  ? {
                      transform: "translateX(16.5px)",
                      borderRadius: "0.4vw",
                      color: "aliceblue",
                    }
                  : {}
              }
            />
          </div>
        </div>

        <div className="dropdown" style={menu ? dropdown : { display: "none" }}>
          <Link href="/notesPage" className="menuButton">
            <h6 className="menuText">Notes</h6>
            <div className="mIcon">
              <MdArrowForwardIos />
            </div>
          </Link>

          <button onClick={logout} className="menuButton">
            <h5 className="menuText">Logout</h5>
            <div className="mIcon">
              <HiLogout />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default profileNav;
