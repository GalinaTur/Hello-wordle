import React, {useEffect} from "react";
import styles from "./Keyboard.module.scss";
import { KeyboardBtn } from "./KeyboardBtn/KeyboardBtn";
import words from "../../store/index.js";

const checkLettersCount = (lettersCount) => {
    return (lettersCount === 5);
}

const checkIsWordInList = (word) => {
    return words.includes(word);
}

const createKeyColorMap = (word, dailyWord) => {
    const keyColorMap = new Map();
    let i = 0;

    for (let letter of word) {
        if (letter === dailyWord[i]) {
            keyColorMap.set(letter, "green");
        } else if (letter === dailyWord[i] && [...dailyWord].lastIndexOf(letter) > i){
            keyColorMap.set(letter, "yellow");
        } else if (dailyWord.includes(letter) && !keyColorMap.has(letter)){
            keyColorMap.set(letter, "yellow");
        } else if (dailyWord.includes(letter) && keyColorMap.has(letter)){
            continue;
        }else {
            keyColorMap.set(letter, "gray");
        }

        i++;
    }
    return keyColorMap;

}
    let newKeyColorMap = {};

const setColorsToKeyboard = (mapColors) => {
    for (let [key, color] of mapColors) {
        const keyToColor = document.querySelector(`[data-key="${key.toLowerCase()}"]`);
        keyToColor.dataset.color = color;
    }
}

export const Keyboard = ({ setWords, activeRow, setActiveRow, setMessage, guessedLeters, setGuessedLeters, dailyWord }) => {

    const handleBackspaceClick = () => {
        setWords((prev) => {
            const currentWord = prev[activeRow];
            return [...prev.slice(0, -1), currentWord.slice(0, -1)];
        });
    }



    const handleEnterClick = () => {
        setWords((prev) => {
            const currentWord = prev[activeRow];
            if (!checkLettersCount(currentWord.length)) {
                setMessage('Not enough letters');
                return prev;
            };

            if (!checkIsWordInList(currentWord)) {
                setMessage('Not in word list');
                return prev;
            } else {
                setActiveRow((prev) => prev + 1);
                setGuessedLeters((prev) => {
                    newKeyColorMap = createKeyColorMap(currentWord, dailyWord);
                    const prevMap = new Map([...prev]);
                    for (let [key, value] of newKeyColorMap) {
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

    const handleClick = ({ target }) => {
        setWords((prev) => {
            const currentWord = prev[activeRow];
            const newWords = activeRow ? [...prev.slice(0, -1), currentWord.concat(target.textContent)] : [currentWord.concat(target.textContent)];
            return currentWord.length !== 5 ? newWords : prev;
        })
    };

    useEffect(()=> {
        setColorsToKeyboard(guessedLeters);
    }, [guessedLeters]);

    return (
        <div className={styles.keyboard}>
            <div className={styles.row}>
                <KeyboardBtn className="keyboard__button" btnKey='q' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='w' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='e' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='r' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='t' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='y' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='u' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='i' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='o' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='p' onClick={handleClick} />
            </div>
            <div className={styles.row}>
                <KeyboardBtn className="keyboard__button" btnKey='a' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='s' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='d' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='f' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='g' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='h' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='j' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='k' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='l' onClick={handleClick} />
            </div>
            <div className={styles.row}>
                <KeyboardBtn className="keyboard__button" btnKey='enter' onClick={handleEnterClick} />
                <KeyboardBtn className="keyboard__button" btnKey='z' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='x' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='c' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='v' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='b' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='n' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='m' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='backspace' onClick={handleBackspaceClick} />
            </div>
        </div>
    )
}
