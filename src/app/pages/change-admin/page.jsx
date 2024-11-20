"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import back from "../../homeimages/back2.jpg";
import framee from "../../homeimages/Frame.svg";
import icon from "../../homeimages/icon.svg";
import passIcon from "../../homeimages/pass.svg";
import styles from "./reset.module.css";

export default function Reset() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      setErrorMessage("User not logged in");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!userId) {
      setErrorMessage("User not logged in");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the API to change password
      const response = await fetch(`${URL}/api/admin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: formData.old_password,
          new_password: formData.new_password,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Password changed successfully.");
        setTimeout(() => {
          router.push("/pages/admin"); // Redirect to login page after password change
        }, 2000);
      } else {
        const result = await response.json();
        setErrorMessage(result.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.continar}>
        <Image src={back} className={styles.back} alt="background" />
        <div className={styles.cont2}>
          <Image className={styles.line} src={icon} alt="icon" />
          <Image src={framee} alt="icon" className={styles.img1} />
          <Image src={framee} alt="icon" className={styles.img2} />
          <div className={styles.formcont}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.h1}>Change Password</h1>
              <div className={styles.inputs}>
                <div className={styles.inpcont}>
                  <Image src={passIcon} className={styles.pass} alt="Old Password" />
                  <input
                    type="password"
                    name="old_password"
                    className={styles.inp}
                    placeholder="Old Password"
                    value={formData.old_password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inpcont}>
                  <Image src={passIcon} className={styles.pass} alt="New Password" />
                  <input
                    type="password"
                    name="new_password"
                    className={styles.inp}
                    placeholder="New Password"
                    value={formData.new_password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.btn}>
                  <button className={styles.btn1} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Changing Password..." : "Change Password"}
                  </button>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
