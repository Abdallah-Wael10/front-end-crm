"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import back from "../../homeimages/back2.jpg";
import framee from "../../homeimages/Frame.svg";
import icon from "../../homeimages/icon.svg";
import emailIcon from "../../homeimages/email.svg";
import passIcon from "../../homeimages/pass.svg";
import userIcon from "../../homeimages/user.svg";
import styles from "./create.module.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Password confirmation validation
    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    // Add action to the form data
    const dataToSend = {
      ...formData,
    };

    // Send the form data directly
    try {
      const response = await fetch(`${URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Send the updated form data
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Signup successful:", result);
        router.push("/pages/sales-admin"); // Redirect to login page
      } else {
        setErrorMessage(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Something went wrong. Please try again.");
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
              <h1 className={styles.h1}>Create an account</h1>
              <div className={styles.inputs}>
                <div className={styles.first}>
                  <div className={styles.inpcont1}>
                    <Image src={userIcon} className={styles.email2} alt="firstname" />
                    <input
                      type="text"
                      name="first_name"
                      className={styles.inp1}
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.inpcont1}>
                    <Image src={userIcon} className={styles.email2} alt="lastname" />
                    <input
                      type="text"
                      name="last_name"
                      className={styles.inp1}
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.inpcont}>
                  <Image src={emailIcon} className={styles.email} alt="email" />
                  <input
                    type="email"
                    name="email"
                    className={styles.inp}
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inpcont}>
                  <Image src={emailIcon} className={styles.email} alt="phone" />
                  <input
                    type="number"
                    name="phone"
                    className={styles.inp}
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inpcont}>
                  <Image src={passIcon} className={styles.pass} alt="password" />
                  <input
                    type="password"
                    name="password"
                    className={styles.inp}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inpcont}>
                  <Image src={passIcon} className={styles.pass} alt="confirm password" />
                  <input
                    type="password"
                    name="confirm_password"
                    className={styles.inp}
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.check}>
                  <input className={styles.check1} type="checkbox" name="checkbox" required />
                  <h1 className={styles.h1c}>
                    I agree to the <span className={styles.span}>terms & conditions</span>
                  </h1>
                </div>
                <div className={styles.btn}>
                  <button className={styles.btn1} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Create an account"}
                  </button>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
