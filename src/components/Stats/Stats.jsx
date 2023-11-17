import { useState, useEffect } from "react";
import styles from "./Stats.module.scss";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';
import { Rate } from "./Rate/Rate";

Chart.register(...registerables);

const initialChartData = [0, 0, 0, 0, 0, 0];

class StatsRate {
    key;
    value;
    constructor(key) {
        this.key = key;
        this.value = JSON.parse(localStorage.getItem(key)) || 0;
    }

    update(value) {
        localStorage.setItem(this.key, JSON.stringify(value !== 0 ? this.value : value));
    }

    increase() {
        this.value++;
        this.update();
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.update();
    }
}

class ChartRate extends StatsRate {
    constructor(key) {
        super(key);
        this.value = JSON.parse(localStorage.getItem(key)) || initialChartData;
    }

    increase(index) {
        this.value[index]++;
        this.update();
    }
}

let streak = 0;

export const Stats = ({ gameStatus, winRow }) => {
    let gamesPlayed = new StatsRate("games_played");
    let gamesWon = new StatsRate('games_won');
    let currStreak = new StatsRate('curr_streak');
    let maxStreak = new StatsRate('max_streak');
    let guessDistrib = new ChartRate('guess_distrib');

    const [played, setPlayed] = useState(gamesPlayed.value)

    const checkMaxStreak = () => {
        if (currStreak.value > maxStreak.value) {
            maxStreak.value = currStreak.value;
            maxStreak.update();
        }
    }

    const increaseWinRates = () => {
        gamesPlayed.increase();
        gamesWon.increase();
        currStreak.increase();
        guessDistrib.increase(winRow);
    }

    useEffect(() => {
        if (gameStatus === 'win') {
            increaseWinRates();
            checkMaxStreak();
            setPlayed(gamesPlayed.value);
            streak = currStreak.value;
        } else if (gameStatus === 'lose') {
            gamesPlayed.increase();
            setPlayed(gamesPlayed.value);
            streak = currStreak.value;
            currStreak.value = 0;
        }
    }, [gameStatus]);

    const chartData = {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [{
            data: guessDistrib.value.map(guess => guess),
            backgroundColor: guessDistrib.value.map((guess, i) => i === winRow ? 'rgb(37, 219, 31)' : 'rgb(160, 160, 160)'),
            datalabels: {
                align: 'start',
                anchor: 'end'
            }
        }]
    };

    const chartOptions = {
        indexAxis: 'y',
        minBarLength: Math.max(window.innerWidth / 50, 20),
        animation: {
            // y: false,
            // duration: 0,
        },
        animation: {
            duration: 0,
        },
        plugins: {
            datalabels: {
                color: 'black',
                font: {
                    family: 'Patrick Hand SC',
                    size: 12 + window.innerWidth / 300
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
    }

    return played && (
        <div className={styles.stats}>
            <h3>Statistics</h3>
            <div className={styles.row}>
                <Rate title='played' value={gamesPlayed.value} />
                <Rate title={`Win ${gamesWon.value}`} value={`${Math.round(gamesWon.value * 100 / gamesPlayed.value)}%`} />
                <Rate title={`current\nstreak`} value={streak} />
                <Rate title={`max\nstreak`} value={maxStreak.value} />
            </div>
            <div>
                <h4>Guess distribution</h4>
                <Bar data={chartData} options={chartOptions}
                    plugins={[datalabels]}/>
            </div>
        </div>
    )
}