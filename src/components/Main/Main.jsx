import React, { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Container } from "../Container/Container";
import { Keyboard } from "../Keyboard/Keyboard";
import { Field } from "../Field/Field";
import { ModalHint } from "./ModalHint/ModalHint";
import { ModalGameOver } from "./ModalGameOver/ModalGameOver";

const checkIsGameOver = (word, dailyWord, activeRow) => {
    if (word === dailyWord) {
        return 'win';
    } else if (activeRow === 6){
        return 'lose';
    } else {
        return 'in progress';
    }
}

export const Main = ({ dailyWord }) => {

    const [gameStatus, setGameStatus] = useState('in progress');

    const [guessedLeters, setGuessedLeters] = useState(new Map());

    const [activeRow, setActiveRow] = useState(0);

    const [words, setWords] = useState(['']);

    const [message, setMessage] = useState('');
    useEffect(() => {
        setTimeout(() => setMessage(''), 1000)
    }, [message]);

    useEffect(()=> {
        if (activeRow !== 0) setGameStatus(checkIsGameOver((words[words.length-2] || ''), dailyWord, activeRow));
    }, [activeRow]);

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                <Field words={words} dailyWord={dailyWord} activeRow={activeRow} />
                <Keyboard setWords={setWords} activeRow={activeRow} setActiveRow={setActiveRow} setMessage={setMessage}
                    setGuessedLeters={setGuessedLeters} guessedLeters={guessedLeters} dailyWord={dailyWord}
                />
                <ModalHint message={message} />
                <ModalGameOver gameStatus={gameStatus} dailyWord={dailyWord}/>
            </Container>
        </main>
    )
}