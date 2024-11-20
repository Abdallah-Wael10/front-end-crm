"use client";
import React from "react";
import style from "./dash.module.css";
import Nav2 from "@/app/compnant/nav2/page";
import Image from "next/image";
import total from "./images/total.svg";
import done from "./images/done.svg";
import lost from "./images/lost.svg";
import follow from "./images/follow.svg";
import delay from "./images/delay.svg";
import { useState, useEffect } from "react";
import one from "./images/one.svg";
import { Bar } from "react-chartjs-2";
import LeadStatusSelector from "@/app/compnant/box/page";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const Dashboard = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState({
    totalLeads: Array(12).fill(0),
    doneLeads: Array(12).fill(0),
  });
  const [crmData, setCrmData] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
      fetch(`${URL}/api/adminLeads`)
        .then((res) => res.json())
        .then((data) => setCrmData(data))
        .catch((error) => console.error("Error fetching leads data:", error));

      fetch(`${URL}/api/admin`)
        .then((res) => res.json())
        .then((data) => {
          setDataUsers(data);
          const user = data.find((u) => u._id === id);
          if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
          } else {
            console.error("User not found with the given ID");
          }
        })
        .catch((error) => console.log("Error fetching user data:", error));
    } else {
      console.error("User ID not found in local storage");
      router.push("/pages/admin");
    }
  }, [URL,router]);

  useEffect(() => {
    if (crmData.length > 0 && userId) {
      const leadsByMonth = Array(12).fill(0);
      const doneByMonth = Array(12).fill(0);

      crmData.forEach((lead) => {
        if (lead.userId === userId) {
          const leadDate = new Date(lead.date);
          if (leadDate.getFullYear() === selectedYear) {
            const month = leadDate.getMonth();
            leadsByMonth[month] += 1;
            if (lead.leadStatus === "done") {
              doneByMonth[month] += 1;
            }
          }
        }
      });

      setMonthlyData({
        totalLeads: leadsByMonth,
        doneLeads: doneByMonth,
      });
    }
  }, [crmData, selectedYear, userId]);

  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadWhatsapp, setLeadWhatsapp] = useState("");
  const [leadSource, setLeadSource] = useState("FaceBook");
  const [leadService, setLeadService] = useState("");
  const [leadCarModel, setLeadCarModel] = useState("");
  const [expectedRevenue, setExpectedRevenue] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [selectedLeadStatus, setSelectedLeadStatus] = useState("new");

  const handleData = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const leadData = {
      clientName: leadName,
      phoneNumber: leadPhone,
      whatsappNumber: leadWhatsapp,
      sources: leadSource,
      services: leadService,
      carModel: leadCarModel,
      expectedRevenue: expectedRevenue,
      date: date,
      comment: comment,
      leadStatus: selectedLeadStatus,
      userId: userId,
    };

    try {
      const response = await fetch(`${URL}/api/adminLeads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setLeadName("");
        setLeadPhone("");
        setLeadWhatsapp("");
        setLeadSource("");
        setLeadService("");
        setLeadCarModel("");
        setExpectedRevenue("");
        setDate("");
        setComment("");
        router.push("/pages/leads-admin");
      } else {
        console.error("Failed to add lead:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  const userLeads = crmData.filter((lead) => lead.userId === userId);
  const totalLeads = userLeads.length;
  const doneLeads = userLeads.filter((lead) => lead.leadStatus === "done").length;
  const lostLeads = userLeads.filter((lead) => lead.leadStatus === "lost").length;
  const followUpLeads = userLeads.filter((lead) => lead.leadStatus === "follow up").length;
  const delayLeads = userLeads.filter((lead) => ["delay", "callback", "no answer"].includes(lead.leadStatus)).length;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      { label: "Total Leads", data: monthlyData.totalLeads, backgroundColor: "#E3E3E3", borderRadius: 5 },
      { label: "Done Leads", data: monthlyData.doneLeads, backgroundColor: "#00FF66", borderRadius: 5 },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: true } },
    },
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const leadStatusOptions = [
    { label: "New Lead", value: "new", color: "blue" },
    { label: "Follow up", value: "follow up", color: "purple" },
    { label: "Call Back", value: "callback", color: "orange" },
    { label: "Lost", value: "lost", color: "red" },
    { label: "Done", value: "done", color: "green" },
    { label: "No Answer", value: "no answer", color: "gray" },
  ];

  const statusOptions = [
    { label: "FaceBook", value: "FaceBook" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "ShowRoom", value: "ShowRoom" },
    { label: "Referrals", value: "Referrals" },
  ];

  return (
    <div className={style.dash}>
      <Nav2 />
      <section className={style.sec1}></section>
      <section className={style.sec2}>
        <div className={style.box}>
          <h1 className={style.h1}>
            <Image src={total} alt="total icon" className={style.img} />
            Total Leads
          </h1>
          <span className={style.span}>{totalLeads}</span>
        </div>
        <div className={style.box}>
          <h1 className={style.h1}>
            <Image src={done} alt="done icon" className={style.img} />
            Done Leads
          </h1>
          <span className={style.span}>{doneLeads}</span>
        </div>
        <div className={style.box}>
          <h1 className={style.h1}>
            <Image src={lost} alt="Lost icon" className={style.img} />
            Lost Leads
          </h1>
          <span className={style.span}>{lostLeads}</span>
        </div>
        <div className={style.box}>
          <h1 className={style.h1}>
            <Image src={follow} alt="follow icon" className={style.img} />
            Follow Up
          </h1>
          <span className={style.span}>{followUpLeads}</span>
        </div>
        <div className={style.box}>
          <h1 className={style.h1}>
            <Image src={delay} alt="delay icon" className={style.img} />
            Delay leads
          </h1>
          <span className={style.span}>{delayLeads}</span>
        </div>
      </section>
      <hr />
      <section className={style.sec4}>
        <form
          onSubmit={(e) => handleData(e, selectedLeadStatus)}
          className={style.form}
        >
          <div className={style.text}>
            <h1 className={style.h1s3}>Hello Mr, {firstName} 👋🏼</h1>
            <p className={style.p}>Do you want Create Lead ? </p>
            <LeadStatusSelector
              options={leadStatusOptions}
              onSelect={(status) => setSelectedLeadStatus(status)}
            />
            <div className={style.continar}>
              <label className={style.label} htmlFor="">
                Lead Name
                <input
                  type="text"
                  name="clientName"
                  placeholder="client Name"
                  className={style.inp}
                  onChange={(e) => {
                    setLeadName(e.target.value);
                  }}
                  value={leadName}
                  required
                />
              </label>
              <label className={style.label} htmlFor="">
                Lead Mobile Number
                <input
                  type="text"
                  name="phoneNumber"
                  className={style.inp}
                  placeholder="Phone number"

                  required
                  value={leadPhone}
                  onChange={(e) => {
                    setLeadPhone(e.target.value);
                  }}
                />
              </label>
              <label className={style.label} htmlFor="">
                Lead Whatsapp
                <input
                  type="text"
                  name="whatsappNumber"
                  className={style.inp}
                  placeholder="whatsApp number"

                  required
                  value={leadWhatsapp}
                  onChange={(e) => {
                    setLeadWhatsapp(e.target.value);
                  }}
                />
              </label>
               <label className={style.label} htmlFor="">
               Lead Source
                  <select 
                              type="text"
                              name="sources"
                              className={style.inp}
                              placeholder="Sources"
                              required
                              value={leadSource}
                              onChange={(e) => {
                                setLeadSource(e.target.value)}}
                          >
                              {statusOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                  </option>
                              ))}
                          </select>
                          </label>
              <label className={style.label} htmlFor="">
                Service
                <input
                  type="text"
                  name="services"
                  className={style.inp}
                  placeholder="Services"
                  required
                  value={leadService}
                  onChange={(e) => {
                    setLeadService(e.target.value);
                  }}
                />
              </label>
              <label className={style.label} htmlFor="">
                Car Model
                <input
                  type="text"
                  name="carModel"
                  className={style.inp}
                  placeholder="Car Model"
                  required
                  value={leadCarModel}
                  onChange={(e) => {
                    setLeadCarModel(e.target.value);
                  }}
                />
              </label>
              <label className={style.label} htmlFor="">
                Price
                <input
                  type="text"
                  name="expectedRevenue"
                  className={style.inp}
                  placeholder="Services Price"
                  required
                  value={expectedRevenue}
                  onChange={(e) => {
                    setExpectedRevenue(e.target.value);
                  }}
                />
              </label>
              <label className={style.label} htmlFor="">
                Date
                <input
                  type="date"
                  name="date"
                  className={style.inp}
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </label>
              <label className={style.label} htmlFor="">
                Comment
                <input
                  type="text"
                  name="comment"
                  placeholder="Note"
                  className={style.inp}
                  required
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className={style.btnc}>
              <button className={style.submit} type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        <section className={style.sec5}>
          <div className={style.chart}>
            <div className={style.chartcontainer}>
            <div className={style.yearSelector}>
          <label htmlFor="year">Select Year:</label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            {Array.from({ length: 7 }, (_, i) => {
              const year = 2024 + i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>
              <h2 className={style.charttitle}>Overview</h2>
              <Bar data={data} options={options} />
            </div>
          </div>
          <Image src={one} alt="icon" className={style.immg} />
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
