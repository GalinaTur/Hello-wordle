import { useState, useEffect, useRef } from "react";
import styles from "./Main.module.scss";
import { Container } from "../Container/Container";
import { Keyboard } from "../Keyboard/Keyboard";
import { Field } from "../Field/Field";
import { ModalHint } from "./ModalHint/ModalHint";
import { ModalGameOver } from "./ModalGameOver/ModalGameOver";
import words from "../../store/index.js";
import { Delayed } from "./Delayed/Delayed";

const checkLettersCount = (lettersCount) => {
    return (lettersCount === 5);
}

const checkIsWordInList = (word) => {
    return words.includes(word);
}

const createKeyColorMap = (word, dailyWord) => {
    const keyColorMap = new Map();
    for (let i = 0; i < word.length; i++) {
        if (word[i] === dailyWord[i]) {
            keyColorMap.set(word[i], "green");
        } else if (word[i] === dailyWord[i] && [...dailyWord].lastIndexOf(word[i]) > i) {
            keyColorMap.set(word[i], "yellow");
        } else if (dailyWord.includes(word[i]) && !keyColorMap.has(word[i])) {
            keyColorMap.set(word[i], "yellow");
        } else if (dailyWord.includes(word[i]) && keyColorMap.has(word[i])) {
            continue;
        } else {
            keyColorMap.set(word[i], "gray");
        }
    }
    return keyColorMap;
}

const checkIsGameOver = (word, dailyWord, activeRow) => {
    if (word === dailyWord) {
        return 'win';
    } else if (activeRow === 6) {
        return 'lose';
    } else {
        return 'in progress';
    }
}

const setColorsToKeyboard = (mapColors) => {
    if (!mapColors) {
        for (let key of document.querySelectorAll('.keyboard__button')) {
            key.dataset.color = '';
        }
        return;
    }
    for (let [key, color] of mapColors) {
        const keyToColor = document.querySelector(`[data-key="${key.toLowerCase()}"]`);
        keyToColor.dataset.color = color;
    }
}

export const Main = ({ dailyWord, startNewGame, gameStatus, handleChangeGameStatus }) => {

    const [guessedLetters, setGuessedLetters] = useState(new Map());
    useEffect(() => {
        setColorsToKeyboard(guessedLetters);
    }, [guessedLetters]);

    const [activeRow, setActiveRow] = useState(0);

    const [words, setWords] = useState(['']);

    const [message, setMessage] = useState('');

    const activeRowRef = useRef(null);

    useEffect(() => {
        const messageTimer = setTimeout(() => {
            if (message) {
                setMessage('');
                activeRowRef.current.classList.remove(styles.row_wrongGuess);
            }
        }, 1000);
        return () => clearTimeout(messageTimer);
    }, [message]);

    useEffect(() => {
        const lastRowWord = words[words.length - 2] || '';
        if (activeRow !== 0) handleChangeGameStatus(checkIsGameOver(lastRowWord, dailyWord, activeRow));
    }, [activeRow]);

    const handleEnterClick = () => {
        if (gameStatus !== 'in progress') return;
        setWords((prev) => {
            const currentWord = prev[activeRow];
            if (!checkLettersCount(currentWord.length)) {
                setMessage('Not enough letters');
                activeRowRef.current.classList.add(styles.row_wrongGuess);
                return prev;
            } else if (!checkIsWordInList(currentWord)) {
                setMessage('Not in word list');
                activeRowRef.current.classList.add(styles.row_wrongGuess);
                return prev;
            } else {
                setActiveRow((prev) => prev + 1);
                setGuessedLetters((prev) => {
                    let newKeyColorMap = createKeyColorMap(currentWord, dailyWord);
                    const prevMap = new Map([...prev]);
                    for (let [key] of newKeyColorMap) {
                        if (prevMap && prevMap.has(key) && prevMap.get(key) === 'green') {
                            newKeyColorMap.delete(key);
                        }
                    }
                    return new Map([...prev, ...newKeyColorMap]);
                })
                return [...prev, ''];
            }
        })
    }

    const handleBackspaceClick = () => {
        if (gameStatus !== 'in progress') return;
        setWords((prev) => {
            const currentWord = prev[activeRow];
            return [...prev.slice(0, -1), currentWord.slice(0, -1)];
        });
    }

    const handleClick = ({ target }) => {
        if (gameStatus !== 'in progress') return;
        setWords((prev) => {
            const currentWord = prev[activeRow];
            const newWords = activeRow ? [...prev.slice(0, -1), currentWord.concat(target.textContent)] : [currentWord.concat(target.textContent)];
            return currentWord.length !== 5 ? newWords : prev;
        })
    };

    const handleStartNewGameClick = () => {
        setGuessedLetters(new Map());
        setActiveRow(0);
        setWords(['']);
        handleChangeGameStatus('in progress');
        setColorsToKeyboard(null);
        startNewGame();
    }

const winRow = activeRow - 1;

    return (
        <main className={styles.main}>
            <Container className={styles.container}>
                <Field words={words} dailyWord={dailyWord} activeRow={activeRow} activeRowRef={activeRowRef}/>
                <Keyboard handleEnterClick={handleEnterClick} handleBackspaceClick={handleBackspaceClick} handleClick={handleClick} />
                <ModalHint message={message} />
                {gameStatus !== 'in progress' && 
                <Delayed>
                <ModalGameOver gameStatus={gameStatus} dailyWord={dailyWord} handleStartNewGameClick={handleStartNewGameClick} winRow={winRow}/>
                </Delayed>}
            </Container>
        </main>
    )
}