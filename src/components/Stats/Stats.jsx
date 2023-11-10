import { useState, useEffect } from "react";
import styles from "./Stats.module.scss";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

const statsData = [
    { amount: 0, current: false },
    { amount: 1, current: false },
    { amount: 4, current: false },
    { amount: 5, current: true },
    { amount: 8, current: false },
    { amount: 3, current: false }
]

export const Stats = ({ dailyWord, startNewGame }) => {

    return (
        <div className={styles.stats}>
            <h2>Statistics</h2>
            <div className={styles.row}>
                <div>
                    <p>1</p>
                    <p>Played</p>
                </div>
                <div>
                    <p>100%</p>
                    <p>Win 1</p>
                </div>
                <div>
                    <p>1</p>
                    <p>Current Streak</p>
                </div>
                <div>
                    <p>1</p>
                    <p>Max Streak</p>
                </div>
            </div>
            <h3>Guess distribution</h3>
            <Bar data={{
                labels: [1, 2, 3, 4, 5, 6],
                datasets: [{
                    data: statsData.map(guess => guess.amount),
                    backgroundColor: statsData.map(guess => guess.current ? 'rgb(37, 219, 31)' : 'rgb(160, 160, 160)'),
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }],
            }} options={{
                indexAxis: 'y',
                minBarLength: Math.max(window.innerWidth / 50, 20),
                plugins: {
                    datalabels: {
                        color: 'black',
                            font: {
                                family: 'Patrick Hand SC',
                                size: 12+window.innerWidth/300
                            }
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                }, scales: {
                    x: {
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'black',
                            font: {
                                family: 'Patrick Hand SC',
                                size: 14
                            }
                        }
                    }
                }
            }} 
                plugins={[datalabels]}
            />
        </div>
    )
}