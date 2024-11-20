"use client";
import React, { useEffect, useState } from 'react';
import styles from './box.module.css';

const LeadStatusSelector = ({ options = [], onSelect, leadStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(leadStatus);

    useEffect(() => {
        setSelectedStatus(leadStatus);
    }, [leadStatus]);

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        onSelect(status);
    };

    return (
        <div className={styles.statusContainer}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`${styles.statusButton} ${
                        selectedStatus === option.value ? styles.selected : ''
                    }`}
                >
                    <input
                        type="radio"
                        name="leadStatus"
                        value={option.value}
                        checked={selectedStatus === option.value}
                        onChange={() => handleStatusChange(option.value)}
                    />
                    <span className={`${styles.statusIcon} ${styles[option.color]}`}></span>
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default LeadStatusSelector;
