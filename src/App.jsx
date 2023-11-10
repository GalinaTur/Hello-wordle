import { useState, useEffect } from 'react';
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import words from './store';

let randomIndex = (Math.round(Math.random() * 5756));

export const App = () => {
    const [dailyWord, setDailyWord] = useState('');

    const startNewGame = () => {
        randomIndex = (Math.round(Math.random() * 5756));
        setDailyWord('words[randomIndex]');
    }

    console.log(dailyWord);

    useEffect(() => setDailyWord('pumps'), []);
    return (
        <>
            <Header />
            <Main dailyWord={dailyWord} startNewGame={startNewGame} />
        </>
    )
}