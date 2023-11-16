import styles from "./Row.module.scss";
import classNames from "classnames";
import { Cell } from "./Cell/Cell";

const setCellColor = (word, dailyWord, index) => {
    if (word[index] === dailyWord[index]) {
        return "green";
    } else if (dailyWord.includes(word[index])) {
        return "yellow";
    } else {
        return "gray";
    }
}

const checkForFullMatching = (word, dailyWord) => {
    let matchIndexes = [];
    let pseudoDailyWord = dailyWord;
    for (let i = 0; i < 5; i++) {
        if (word[i] === pseudoDailyWord[i]) { 
            matchIndexes.push(i);
            pseudoDailyWord = pseudoDailyWord.replace(word[i], ' ');
        }
    }
    return [matchIndexes, pseudoDailyWord];
}

const isFilledRow = (currentRow, activeRow) => {
    return currentRow < activeRow;
}

const changePseudoDailyWord = (dailyWord, letter) => {
    if ([...dailyWord].filter(item => item === letter).length > 1) {
        return dailyWord;
    }
    return dailyWord.replace(letter, ' ');
}

export const Row = ({ activeRowRef, className, word, dailyWord, activeRow, nth }) => {

    const row = [];
    let color = '';
    let pseudoDailyWord  = dailyWord;
    let matchIndexes = [];

    if (isFilledRow(nth, activeRow)) [matchIndexes, pseudoDailyWord] = checkForFullMatching(word, pseudoDailyWord);

    for (let i = 0; i < 5; i++) {
        if (isFilledRow(nth, activeRow) && matchIndexes.includes(i)) {
            color = 'green';
        } else if (isFilledRow(nth, activeRow)) color = setCellColor(word, pseudoDailyWord, i);
        if (color === "yellow") {
            pseudoDailyWord = changePseudoDailyWord(pseudoDailyWord, word[i]);
        }
        row.push(<Cell nth={i} color={isFilledRow(nth, activeRow) ? color : ''}
            value={word[i] ? word[i] : ''} key={i} />);
    };

    return (
        <div ref={nth === activeRow ? activeRowRef : null} className={classNames(className, styles.row)}>
            {row}
        </div>
    )
}
