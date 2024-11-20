"use client";
import { useState , useEffect } from 'react';
import React from 'react'
import style from "./big.module.css"
import total from "./images/total.svg";
import done from "./images/done.svg";
import lost from "./images/lost.svg";
import follow from "./images/follow.svg";
import delay from "./images/delay.svg";
import Image from 'next/image';
import user from "./images/user.svg"
import phonee from "./images/phone.svg"
import emaill from "./images/email.svg"
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const Big_Card = ({deletee, totalLeads, doneleads, lostleads, delayleads, email, username, phone, followup, monthlyData = {}, onClose }) => {
 
     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyDataForSelectedYear, setMonthlyDataForSelectedYear] = useState({ totalLeads: [], doneLeads: [] });
     useEffect(() => {
        // Update monthly data for the selected year
        if (monthlyData[selectedYear]) {
            const { totalLeads, doneLeads } = monthlyData[selectedYear];
            setMonthlyDataForSelectedYear({ totalLeads, doneLeads });
        } else {
            // Reset data if no data for the selected year
            setMonthlyDataForSelectedYear({ totalLeads: [], doneLeads: [] });
        }
    }, [selectedYear, monthlyData]);
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
          {
              label: "Total Leads",
              data: monthlyDataForSelectedYear.totalLeads,
              backgroundColor: "#E3E3E3",
              borderRadius: 5,
          },
          {
              label: "Done Leads",
              data: monthlyDataForSelectedYear.doneLeads,
              backgroundColor: "#00FF66",
              borderRadius: 5,
          },
      ],
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
};


const options = {
  responsive: true,
  plugins: {
      legend: { display: true },
  },
  scales: {
      x: { grid: { display: false } },
      y: { grid: { display: true } },
  },
};
const yearsWithData = Object.keys(monthlyData).filter(
  year => monthlyData[year]?.totalLeads?.length > 0
);
  
    return (
      <div className={style.big}>
        <section className={style.sec1}>
          <div className={style.continar}>
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
              <span className={style.span}>{doneleads}</span>
            </div>
            <div className={style.box}>
              <h1 className={style.h1}>
                <Image src={lost} alt="lost icon" className={style.img} />
                Lost Leads
              </h1>
              <span className={style.span}>{lostleads}</span>
            </div>
            <div className={style.box}>
              <h1 className={style.h1}>
                <Image src={delay} alt="delay icon" className={style.img} />
                Delay Leads
              </h1>
              <span className={style.span}>{delayleads}</span>
            </div>
            <div className={style.box}>
              <h1 className={style.h1}>
                <Image src={follow} alt="follow-up icon" className={style.img} />
                Follow up Leads
              </h1>
              <span className={style.span}>{followup}</span>
            </div>
          </div>
        </section>
  
        <section className={style.sec5}>
          <div className={style.chartcontainer}>
            <h2 className={style.charttitle}>Overview</h2>
            <div className={style.yearSelector}>

            <select value={selectedYear} onChange={handleYearChange}>
                    {yearsWithData.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                </div>
            <Bar data={data} options={options} />
          </div>
  
          <div className={style.text}>
            <h1 className={style.inp}>
              <Image src={user} alt='icon' className={style.imgg} /> {username}
            </h1>
            <h1 className={style.inp}>
              <Image src={phonee} alt='icon'  className={style.imgg} /> {phone}
            </h1>
            <h1 className={style.inp}>
              <Image src={emaill} alt='icon'  className={style.imgg} /> {email}
            </h1>
            <button className={style.closeButton} onClick={onClose}>
              Close
            </button>
            <button className={style.deleteButton} onClick={deletee}>
              Delete
            </button>
          </div>
        </section>
      </div>
    );
  };
  
  export default Big_Card;
  