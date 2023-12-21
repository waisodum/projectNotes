"use client";

import React, { useEffect, useState } from "react";
import "../Styles/login.css";
import gsap from "gsap";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const t2 = gsap.timeline();

    gsap.from(".login", {
      duration: 1,
    }),
      gsap.to(".login", {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power1.out",
      });
  }, []);
function handleSubmit(e) {
    e.preventDefault();
}
  return (
    <div className="login">
      <div className="innerLogin login">
        <h1 className="lHeading">Sign In</h1>

        <div className="loginMethods">
          <Link href="/" className="methodLink">
            <div className="methodIcon">
              <FcGoogle />
            </div>{" "}
            <h2 className="methodName">Google</h2>
          </Link>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputRow">
            <p className="fieldName">Username:</p>{" "}
            <input
              className="inputBox"
              type="text"
              value={username}
              placeholder="Enter username here"
              required
              onChange={(name) => {
                setUsername(name.target.value);
              }}
            />
          </div>

          <div className="inputRow">
            <p className="fieldName">Password:</p>{" "}
            <input
              className="inputBox"
              type="password"
              value={password}
              placeholder="Password goes here"
              onChange={(pass) => {
                setPassword(pass.target.value);
              }}
            />
          </div>
          <Link className="forgotPass" href="/">
            Forgot Password?{" "}
          </Link>

          <div className="inputRow" >
            <button className="loginButton" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
