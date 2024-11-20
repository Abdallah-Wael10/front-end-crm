"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import style from "../edit.module.css";
import LeadStatusSelector from "@/app/compnant/box/page";

const Edit = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [leadSource, setLeadSource] = useState("FaceBook");
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    clientName: "",
    phoneNumber: "",
    salesName: "",
    whatsappNumber: "",
    carModel: "",
    services: [],
    date: "",
    carStatus: "",
    expectedRevenue: "",
    email: "",
    leadStatus: "",
    sources: leadSource,
    comment: "",
  });

  const statusOptions = [
    { label: "FaceBook", value: "FaceBook" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "ShowRoom", value: "ShowRoom" },
    { label: "Referrals", value: "Referrals" },
  ];

  const [dataUsers, setDataUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userIdd, setUserIdd] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    console.log("Retrieved user ID from localStorage:", id); // Log the user ID
    if (id) {
      setUserIdd(id);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  useEffect(() => {
    // Fetch user data only after userIdd is set
    if (userIdd) {
      fetch(`${URL}/api/users`)
        .then((res) => res.json())
        .then((data) => {
          setDataUsers(data);
          const user = data.find((u) => u._id === userIdd);
          if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
          } else {
            console.error("User not found with the given ID:", userIdd);
          }
        })
        .catch((error) => console.log("Error fetching data:", error));
    }
  }, [ URL,userIdd]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await fetch(`${URL}/api/userLeads/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lead data");
        }
        const leadData = await response.json();
        setFormData(leadData);
      } catch (error) {
        console.error("Error fetching lead data:", error);
        setSubmitMessage("Error fetching lead data. Please try again later.");
      }
    };

    if (id) {
      fetchLeadData();
    }
  }, [URL,id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusSelect = (status) => {
    setFormData((prevData) => ({ ...prevData, leadStatus: status }));
    console.log(`Selected lead status: ${status}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const dataToSend = { ...formData };

      const response = await fetch(`/api/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const result = await response.json();
        const errorMessage = result.error || "Failed to submit form";
        throw new Error(errorMessage);
      }

      setSubmitMessage("Lead data updated successfully!");
      window.location.href = "/pages/leads"; // Adjust this to your dashboard route
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage(`Failed to update lead data: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const leadStatusOptions = [
    { label: "New Lead", value: "new", color: "blue" },
    { label: "Follow up", value: "follow up", color: "purple" },
    { label: "Call Back", value: "callback", color: "orange" },
    { label: "Lost", value: "lost", color: "red" },
    { label: "Done", value: "done", color: "green" },
    { label: "No Answer", value: "no answer", color: "gray" },
  ];

  return (
    <section className={style.sec4}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.text}>
          <h1 className={style.h1s3}>Hello {firstName} 👋🏼,</h1>
          <p className={style.p}>Do you want to update the lead?</p>
          <LeadStatusSelector
            options={leadStatusOptions}
            onSelect={handleStatusSelect}
            leadStatus={formData.leadStatus} // Pass the current leadStatus
          />
          <div className={style.continar}>
            <label className={style.label}>
              Lead Name
              <input
                type="text"
                name="clientName"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.clientName}
              />
            </label>
            <label className={style.label}>
              Lead Mobile Number
              <input
                type="text"
                name="phoneNumber"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.phoneNumber}
              />
            </label>
            <label className={style.label}>
              Lead Whatsapp
              <input
                type="text"
                name="whatsappNumber"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.whatsappNumber}
              />
            </label>
            <label className={style.label}>
              Lead Source
              <select
                name="sources"
                className={style.inp}
                value={formData.sources}
                onChange={handleInputChange}
                required
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={style.label}>
              Service
              <input
                type="text"
                name="services"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.services}
              />
            </label>
            <label className={style.label}>
              Car Model
              <input
                type="text"
                name="carModel"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.carModel}
              />
            </label>
            <label className={style.label}>
              Price
              <input
                type="text"
                name="expectedRevenue"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.expectedRevenue}
              />
            </label>
            <label className={style.label}>
              Date
              <input
                type="date"
                name="date"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.date}
              />
            </label>
            <label className={style.label}>
              Comment
              <input
                type="text"
                name="comment"
                className={style.inp}
                onChange={handleInputChange}
                value={formData.comment}
              />
            </label>
          </div>
          <div className={style.btnc}>
            <button
              type="submit"
              name="clint"
              disabled={isSubmitting}
              className={style.submit}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            {submitMessage && <p className={style.message}>{submitMessage}</p>}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Edit;
