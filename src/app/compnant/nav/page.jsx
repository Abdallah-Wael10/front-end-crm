"use client";
import React from 'react';
import styles from "./nav.module.css";
import Link from 'next/link';
import Image from 'next/image';
import dash from "./iamges/dash.svg";
import lead from "./iamges/lead.svg";
import logo from "./iamges/logo.png";
import profil from "./iamges/Profil.png";
import setting from "./iamges/setting.svg";
import { useState, useEffect } from "react";


const Nav = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userIdd, setUserIdd] = useState(null);

  useEffect(() => {
    // Retrieve user ID from localStorage
    const id = localStorage.getItem("userId");
    if (id) {
      setUserIdd(id);
    } else {
      console.error("User ID not found in localStorage");
    }

    // Fetch user data from API
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setDataUsers(data);

        // Find user by ID
        const user = data.find((u) => u._id === id);
        if (user) {
          setFirstName(user.first_name);
          setLastName(user.last_name);
        } else {
          console.error("User not found with the given ID");
        }
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logOut = ()=>{
    window.location.href = "/"
  }
  return (
    <nav className={styles.nav}>
      <div className={`${styles.first} ${menuOpen ? styles.active : ''}`}>
        <h1 className={styles.crm}>C<span className={styles.span}>RM</span></h1>
        <Link href="/pages/dashboard" className={styles.link}>
          <Image src={dash} alt="icon" className={styles.img} />
          Dashboard
        </Link>
        <Link href="/pages/leads" className={styles.link}>
          <Image src={lead} alt="icon" className={styles.img} />
          Leads
        </Link>
        <div className={styles.link} onClick={logOut}>
        Log out
        </div>
      </div>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" className={styles.logoimg} />
      </div>

      <div className={styles.profile}>
        <Image src={logo} className={styles.profil} alt="profile" />
        <h1 className={styles.h1p}>{firstName} {lastName}</h1>
      </div>
    <Link className={styles.setting} href="/pages/change-password">
      <div >
        <Image src={setting} className={styles.sett} alt="setting_icon" />
      </div>
      </Link>

      <div className={styles.menuToggle} onClick={toggleMenu}>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
      </div>
    </nav>
  );
};

export default Nav;
