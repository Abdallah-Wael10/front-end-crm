"use client";
import React, { useState, useEffect } from "react";
import style from "./sales.module.css";
import Nav2 from "@/app/compnant/nav2/page";
import Card3 from "@/app/compnant/card3/page";
import Big_Card from "@/app/compnant/bigcard/page";

const Sales = () => {
  const [salesLeadsData, setSalesLeadsData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [search, setSearch] = useState("");
  const URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        const leadsResponse = await fetch(`${URL}/api/userLeads`);
        const usersResponse = await fetch(`${URL}/api/users`);
        const leadsData = await leadsResponse.json();
        const usersData = await usersResponse.json();
  
        const userLeadMap = {};
  
        leadsData.forEach((lead) => {
          const userId = lead.userId;
          const date = new Date(lead.date);
          const year = date.getFullYear();
          const month = date.getMonth();
  
          // Ensure we have a data structure for the user
          if (!userLeadMap[userId]) {
            userLeadMap[userId] = {
              totalLeads: 0,
              doneLeads: 0,
              lostLeads: 0,
              delayLeads: 0,
              followupLeads: 0,
              monthlyData: {},
            };
          }
  
          // Update total leads
          userLeadMap[userId].totalLeads += 1;
  
          // Update counts based on lead status
          if (lead.leadStatus === "done") {
            userLeadMap[userId].doneLeads += 1;
          } else if (lead.leadStatus === "lost") {
            userLeadMap[userId].lostLeads += 1;
          } else if (lead.leadStatus === "delay") {
            userLeadMap[userId].delayLeads += 1;
          } else if (lead.leadStatus === "callback" || lead.leadStatus === "no answer") {
            userLeadMap[userId].delayLeads += 1; // Count both callbacks and no answer as follow-ups
          } else if (lead.leadStatus === "follow up") {
            userLeadMap[userId].followupLeads += 1; // Count both callbacks and no answer as follow-ups
          }
  
          // Initialize yearly data if it doesn't exist
          if (!userLeadMap[userId].monthlyData[year]) {
            userLeadMap[userId].monthlyData[year] = {
              totalLeads: Array(12).fill(0),
              doneLeads: Array(12).fill(0),
            };
          }
  
          // Update monthly data
          userLeadMap[userId].monthlyData[year].totalLeads[month] += 1;
          if (lead.leadStatus === "done") {
            userLeadMap[userId].monthlyData[year].doneLeads[month] += 1;
          }
        });
  
        // Combine leads data with user info
        const combinedData = usersData.map((user) => {
          const leadStats = userLeadMap[user._id] || {
            totalLeads: 0,
            doneLeads: 0,
            lostLeads: 0,
            delayLeads: 0,
            followupLeads: 0,
            monthlyData: {},
          };
  
          return {
            id: user._id,
            salesName: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone,
            totalLeads: leadStats.totalLeads,
            doneLeads: leadStats.doneLeads,
            lostLeads: leadStats.lostLeads,
            delayLeads: leadStats.delayLeads,
            followupLeads: leadStats.followupLeads,
            monthlyData: leadStats.monthlyData,
          };
        });
  
        setSalesLeadsData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAndCombineData();
  }, [URL,salesLeadsData]);
  

  const deleteUserAndLeads = async (userId) => {
    try {
      const leadsResponse = await fetch(`${URL}/api/userLeads`);
      const leadsData = await leadsResponse.json();
      const userLeads = leadsData.filter((lead) => lead.userId === userId);

      await Promise.all(
        userLeads.map((lead) =>
          fetch(`${URL}/api/userLeads/${lead.id}`, {
            method: "DELETE",
          })
        )
      );

      await fetch(`${URL}/api/users/${userId}`, {
        method: "DELETE",
      });

      setSalesLeadsData((prevData) => prevData.filter((user) => user._id !== userId));
      setSelectedCard(null);
      alert("User and associated leads deleted successfully!");
    } catch (error) {
      console.error("Error deleting user and leads:", error);
      alert("Failed to delete user and leads. Please try again.");
    }
  };

  const handleCardClick = (lead) => setSelectedCard(lead);
  const handleClose = () => setSelectedCard(null);
  const handleInput = (e) => setSearch(e.target.value);

  const filteredLeads = salesLeadsData.filter((lead) =>
    lead.salesName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Nav2 />
      <section className={style.sec1}>
        <div className={style.filter}>
          <input
            type="search"
            name="search"
            id={style.search}
            placeholder="Search"
            onChange={handleInput}
          />
        </div>
      </section>
      {selectedCard && (
        <div className={style.centeredCard}>
          <Big_Card
            totalLeads={selectedCard.totalLeads}
            doneleads={selectedCard.doneLeads}
            lostleads={selectedCard.lostLeads}
            delayleads={selectedCard.delayLeads}
            followup={selectedCard.followupLeads} // Make sure to use the correct prop
            email={selectedCard.email}
            username={selectedCard.salesName}
            phone={selectedCard.phone}
            monthlyData={selectedCard.monthlyData}
            onClose={handleClose}
            deletee={() => deleteUserAndLeads(selectedCard.id)}
          />
        </div>
      )}
      <section className={style.sec3}>
        {filteredLeads.map((sales) => (
          <Card3
            key={sales.id}
            salesnamee={sales.salesName}
            Total_leads={sales.totalLeads}
            Done_leads={sales.doneLeads}
            Lost_leads={sales.lostLeads}
            delay_leads={sales.delayLeads}
            onclick={() => handleCardClick(sales)}
          />
        ))}
      </section>
    </div>
  );
};

export default Sales;
