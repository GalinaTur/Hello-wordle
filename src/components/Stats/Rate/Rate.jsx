import { useState, useEffect } from "react";
import styles from "./Rate.module.scss";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';

export const Rate = ({ title, value}) => {

    return (
        <div className={styles.rate}>
            <p className={styles.amount}>{value}</p>
            <p className={styles.title}>{title}</p>
        </div>
    )
}