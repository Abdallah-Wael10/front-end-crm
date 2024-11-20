"use client";
import Image from "next/image";
import back from "./homeimages/back2.jpg";
import framee from "./homeimages/Frame.svg";
import styles from "./page.module.css";
import { useState } from "react";
import icon from "./homeimages/icon.svg";
import emaill from "./homeimages/email.svg";
import passs from "./homeimages/pass.svg";
import { useRouter } from "next/navigation"; // For navigation after login
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const response = await fetch(`${URL}/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.error || "Failed to log in.");
            return;
        }

        // Check if login was successful and `_id` is present
        if (data && data._id) {
            console.log("Login successful:", data);

            // Store user ID in localStorage
            localStorage.setItem("userId", data._id);

            // Redirect to dashboard
            router.push("/pages/dash-admin")
        } else {
            setErrorMessage("Invalid email or password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
};

  
  return (
    <div className={styles.login}>
      <div className={styles.continar}>
        <Image src={back} alt='icon'  className={styles.back} />
        <div className={styles.cont2}>
          <Image className={styles.line} src={icon} alt="icon" />
          <Image src={framee} alt="icon" className={styles.img1} />
          <Image src={framee} alt="icon" className={styles.img2} />
          <div className={styles.formcont}>
            <form className={styles.form} onSubmit={handleLogin}>
              <h1 className={styles.h1}>Login as Admin</h1>
              <div className={styles.inputs}>
                <div className={styles.inpcont}>
                  <Image src={emaill} className={styles.email} alt="email" />
                  <input
                    type="email"
                    name="email"
                    className={styles.inp}
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inpcont}>
                  <Image src={passs} className={styles.pass} alt="pass" />
                  <input
                    type="password"
                    name="password"
                    className={styles.inp}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.btn}>
                  <button className={styles.btn1} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              </div>
              <Link className={styles.link1} href="/">LogIn As user</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
