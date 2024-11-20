import React from 'react';
import style from "./card.module.css";
import phonei from "./images/phone.svg";
import Image from 'next/image';
import wp from "./images/wp.svg";
import newimg from "./images/new.svg";
import done from "./images/done.svg";
import lost from "./images/lost.svg";
import delay from "./images/delay.svg";
import follow from "./images/follow.svg";
import noAnswer from "./images/no.svg";
import callBack from "./images/callback.svg";

const Card = ({ sales_name, client_name, car, sources, services, leadStatus , onclick }) => {
    // Mapping of leadStatus to image sources
    const statusImages = {
        done: done,
        lost: lost,
        delay: delay,
        'follow up': follow,
        callback: callBack,
        'no answer': noAnswer,
        new: newimg
    };

    // Determine the lead image based on leadStatus
    const leadImage = statusImages[leadStatus] || newimg; // Default to new image if status not found

    const leadColor = {
        done: '#22C55E',
        lost: '#DC2626',
        delay: '#F9DE18',
        'follow up': '#9333EA',
        callback: '#F97316',
        "no answer" : "gray"
    }[leadStatus] || '#2563EB'; // Fallback color if status doesn't match

    return (
        <div className={style.card} onClick={onclick} >
            <div className={style.first}>
                <h1 className={style.client}>{client_name}</h1>
                <div className={style.leads}>
                    <Image src={leadImage} alt="lead status" className={style.img} />
                    <h1 className={style.lead} style={{ color: leadColor }}>{leadStatus}</h1>
                </div>
            </div>
            <div className={style.continar}>
                <div className={style.box}>
                    <h1 className={style.h1}>Sales Name</h1>
                    <h2 className={style.salesname}>{sales_name}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1}>Car Model</h1>
                    <h2 className={style.salesname}>{car}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1}>Source</h1>
                    <h2 className={style.salesname}>{sources}</h2> 
                </div>
                <div className={style.box}>
                    <h1 className={style.h1}>Service</h1>
                    <h2 className={style.salesname}>{services}</h2>
                </div>
            </div>
            <div className={style.continar2}>
                <Image src={phonei} alt="phone" className={style.img} />
                <Image src={wp} alt="whatsapp" className={style.img} />
            </div>
        </div>
    );
}

export default Card;
