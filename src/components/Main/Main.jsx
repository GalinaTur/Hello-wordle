import React, {useState, useEffect} from "react";
import styles from "./Main.module.scss";
import { Container } from "../Container/Container";
import { Keyboard } from "../Keyboard/Keyboard";
import { Field } from "../Field/Field";
import { Modal } from "./Modal/Modal";

export const Main = ({dailyWord}) => {
    const [guessedLeters, setGuessedLeters] = useState(new Map());

    const [activeRow, setActiveRow] = useState(0);
    useEffect(()=>{}, [activeRow]);

    const [words, setWords] = useState(['']);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        setTimeout(()=> setMessage(''), 1000)}, [message]);

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                <Field  words={words} dailyWord={dailyWord} activeRow={activeRow}/>
                <Keyboard setWords={setWords} activeRow={activeRow} setActiveRow={setActiveRow} setMessage={setMessage}
                    setGuessedLeters={setGuessedLeters} guessedLeters={guessedLeters} dailyWord={dailyWord}
                />
                <Modal message={message}/>
            </Container>
        </main>
    )
}