"use client";
import React, { useState } from 'react';
import styles from "./nav2.module.css";
import Link from 'next/link';
import Image from 'next/image';
import dash from "./iamges/dash.svg";
import lead from "./iamges/lead.svg";
import logo from "./iamges/logo.png";
import profil from "./iamges/Profil.png";
import setting from "./iamges/setting.svg";
import user from "./iamges/user.svg";
import sales from "./iamges/sales.svg"
const Nav2 = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <nav className={styles.nav}>
      <div className={`${styles.first} ${menuOpen ? styles.active : ''}`}>
      <h1 className={styles.crm}>C<span className={styles.span}>RM</span></h1>
        <Link href="/pages/dash-admin" className={styles.link}>
        <Image src={dash} alt="icon" className={styles.img}/>
        Dashboard
        </Link>
        <Link href="/pages/leads-admin" className={styles.link}>
        <Image src={lead} alt="icon" className={styles.img}/>
        Leads
        </Link>
        <Link href="/pages/sales-admin" className={styles.link}>
        <Image src={sales} alt="icon" className={styles.img}/>
        Sales
        </Link>
        <Link className={styles.link} href="/pages/admin">
        Log out
        </Link>
        </div>
        <div className={styles.logo}>
            <Image src={logo} alt="logo" className={styles.logoimg}/>
        </div>
        <div className={styles.profile}>
            <Image src={logo} alt='icon'  className={styles.profil}/>
            <h1 className={styles.h1p}>Admin</h1>
        </div>
   
        <Link className={styles.setting} href="/pages/change-admin">
      <div >
        <Image src={setting} className={styles.sett} alt="setting_icon" />
      </div>
      </Link>
        <Link className={styles.setting} href="/pages/create-account">
      <div >
        <Image src={user} className={styles.sett} alt="setting_icon" />
      </div>
      </Link>

            <div className={styles.menuToggle} onClick={toggleMenu}>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
      </div>
    </nav>
  )
}

export default Nav2



