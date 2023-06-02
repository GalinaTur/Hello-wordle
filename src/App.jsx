import React, {useState, useEffect} from 'react';
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import words from './store';

const randomIndex = (Math.round(Math.random()*348));

export const App = () => {

    const [dailyWord, setDailyWord] = useState('');

    useEffect(()=>setDailyWord(words[randomIndex]), []);
    console.log(dailyWord);

    return (
        <>
            <Header />
            <Main dailyWord={dailyWord}/>
        </>
    )
}