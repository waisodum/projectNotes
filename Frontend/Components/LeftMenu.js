"use client";
import { ProfileData } from "@/Helper/Context";
import React, { useContext, useEffect, useState } from "react";
import "../Styles/leftMenu.css";
import Link from "next/link";
import gsap from "gsap";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

function LeftMenu() {
  const { data, subjects, currentSubject, changeCurrentSubject } = useContext(ProfileData);

  const [activeSub, setActiveSub] = useState(null);

  const [sNo, setSNo] = useState(1);

  const [sem, setSem] = useState("Odd");

  const [subject, setSubject] = useState(null);

  const router = useRouter();
  
  
  useEffect(() => {
    const t = gsap.timeline();

    t.to(".leftMenu", {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    t.to(".logo", {
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
      delay: -0.1,
      x: 15,
      scale: 1.1,
    });
  }, []);
  
  const semChange = () => {
    if (sem === "Even") {
      setSem("Odd");
      setSNo(1);
    } else if (sem === "Odd") {
      setSem("Even");
      setSNo(2);
    }
  };

  const branch = data.branch;

  const year = data.year;

  const subjectsList = subjects[branch][year][sNo];

  const clickResponse = async (subject) => {
    // setActiveSub(subject == activeSub ? null : subject);
    if(activeSub !== subject)
      setActiveSub(subject);
    changeCurrentSubject(subject);
    // console.log(activeSub);
  };

  return (
    <div className="leftMenu">
      <div className="logo">
        <Link href="/">
          <h1 className="cNone">Campus Chronicles</h1>
        </Link>
      </div>

      <div className="restMenu">
        <h4 className="headText">Find Relevant Notes</h4>

        <div className="menuOptions">
          <div className="sem">
            <h5 className="semToggle" onClick={semChange}>
              {sem}
            </h5>
            <h5> Sem</h5>
          </div>

          <div className="subjectSelection">
            {subjectsList.map((subject, index) => (
              <button
                className="subjectNames"
                onClick={() => clickResponse(subject)}
                style={
                  activeSub === subject
                    ? { backgroundColor: "aliceblue", color: "black" }
                    : {}
                }
              >
                <div key={index}> {subject} </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
