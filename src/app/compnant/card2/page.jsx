"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import phonei from "./images/phone.svg";
import wp from "./images/wp.svg";
import emaill from "./images/email.svg";
import style from "./card2.module.css";
import newimg from "./images/new.svg";
import done from "./images/done.svg";
import lost from "./images/lost.svg";
import delay from "./images/delay.svg";
import follow from "./images/follow.svg";
import noAnswer from "./images/no.svg";
import callBack from "./images/callback.svg";

const Card2 = ({ id, clientName, leadStatus, phone, whatsapp, email, salesname, carModel, service, source, revenue, date, comment, onClose }) => {
    const router = useRouter();

    const statusImages = {
        done: done,
        lost: lost,
        delay: delay,
        'follow up': follow,
        callback: callBack,
        'no answer': noAnswer,
        new: newimg
    };

    const leadImage = statusImages[leadStatus] || newimg;
    const leadColor = {
        done: '#22C55E',
        lost: '#DC2626',
        delay: '#F9DE18',
        'follow up': '#9333EA',
        callback: '#F97316',
        "no answer": "gray"
    }[leadStatus] || '#2563EB';

    const handleEdit = () => {
        console.log('Navigating to edit with ID:', id); // Debugging
        if (id) {
            router.push(`/pages/edit/${id}`); // Navigate to the edit page (fix route)
        } else {
            console.error('ID is undefined, cannot navigate to edit page.');
        }
    };

    return (
        <div className={style.card2}>
            <div className={style.first}>
                <h1 className={style.h1}>{clientName}</h1>
                <button className={style.closeButton} onClick={onClose}>Close</button>
                <button className={style.closeButton} onClick={handleEdit}>Edit</button> {/* Updated Edit button */}
                <div className={style.leads}>
                    <Image src={leadImage} alt="lead status" className={style.img} />
                    <h1 className={style.lead} style={{ color: leadColor }}>{leadStatus}</h1>
                </div>
            </div>
            <div className={style.first2}>
                <div className={style.phone}>
                    <Image src={phonei} alt="icon phone" className={style.imgg} />
                    <h1 className={style.h1p}>{phone}</h1>
                </div>
                <div className={style.phone}>
                    <Image src={wp} alt="icon whatsapp" className={style.imgg} />
                    <h1 className={style.h1p}>{whatsapp}</h1>
                </div>
            </div>
            <hr className={style.hr} />
            <h1 className={style.h1s}>{salesname}</h1>
            <div className={style.continar}>
                <div className={style.box}>
                    <h1 className={style.h1b}>Car Model</h1>
                    <h2 className={style.salesname}>{carModel}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1b}>Source</h1>
                    <h2 className={style.salesname}>{source}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1b}>Service</h1>
                    <h2 className={style.salesname}>{service}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1b}>Price</h1>
                    <h2 className={style.salesname}>{revenue}</h2>
                </div>
                <div className={style.box}>
                    <h1 className={style.h1b}>Date</h1>
                    <h2 className={style.salesname}>{date}</h2>
                </div>
                <div className={style.comment}>
                    <h1 className={style.h1comment}>Comment</h1>
                    <input type="text" name="comment" className={style.comminp} defaultValue={comment} readOnly placeholder="No comment set" />
                </div>
            </div>
        </div>
    );
};

export default Card2;
