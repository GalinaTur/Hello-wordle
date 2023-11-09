import { useState, useEffect } from 'react';
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import words from './store';

let randomIndex = (Math.round(Math.random() * 5757));

export const App = () => {
    const [dailyWord, setDailyWord] = useState('');

    const startNewGame = () => {
        randomIndex = (Math.round(Math.random() * 5757));
        setDailyWord(words[randomIndex]);
    }

    useEffect(() => setDailyWord(words[randomIndex]), []);
    return (
        <>
            <Header />
            <Main dailyWord={dailyWord} startNewGame={startNewGame} />
        </>
    )
}