import React from 'react';
import style from "./card.module.css";
import sales from "./images/sales.svg";
import Image from 'next/image';


const Card2 = ({ Total_leads, Done_leads, Lost_leads, delay_leads, onclick , salesnamee }) => {


    return (
        <div className={style.card} onClick={onclick} >
            <div className={style.first}>
                <h1 className={style.client}>{salesnamee}</h1>
                <div className={style.leads}>
                    <Image src={sales} alt="icon sales" className={style.img} />
                    <h1 className={style.lead}>Sales</h1>
                </div>
            </div>
            <div className={style.continar}>
                <div className={style.box}>
                    <h1 className={style.h1}>Total Leads</h1>
                    <h2 className={style.salesname}>{Total_leads}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1}>Done Leads</h1>
                    <h2 className={style.salesname}>{Done_leads}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1}>Delay Leads</h1>
                    <h2 className={style.salesname}>{delay_leads}</h2> 
                </div>
                <div className={style.box}>
                    <h1 className={style.h1}>Lost Leads</h1>
                    <h2 className={style.salesname}>{Lost_leads}</h2>
                </div>
            </div>
        </div>
    );
}

export default Card2;
