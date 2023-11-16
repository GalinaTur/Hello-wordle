import { useState, useEffect, useRef } from 'react';
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import words from './store';

let randomIndex = (Math.round(Math.random() * 5756));

export const App = () => {
    const [dailyWord, setDailyWord] = useState('');
    const [gameStatus, setGameStatus] = useState('in progress');

    const startNewGame = () => {
        randomIndex = (Math.round(Math.random() * 5756));
        setDailyWord(words[randomIndex]);
    }

    useEffect(() => setDailyWord(words[randomIndex]), []);

const handleChangeGameStatus = (status) => {setGameStatus(status)}

    return (
        <>
            <Header gameStatus={gameStatus}/>
            <Main dailyWord={dailyWord} startNewGame={startNewGame} gameStatus={gameStatus} handleChangeGameStatus={handleChangeGameStatus}/>
        </>
    )
}