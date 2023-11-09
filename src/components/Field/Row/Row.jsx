import styles from "./Row.module.scss";
import classNames from "classnames";
import { Cell } from "./Cell/Cell";

const setCellColor = (word, dailyWord, index) => {
    if (word[index] === dailyWord[index]) {
        return "green";
    } else if (dailyWord.includes(word[index]) && word[index] !== dailyWord[index]) {
        return "yellow";
    } else {
        return "gray";
    }
}

const isFilledRow = (currentRow, activeRow) => {
    return currentRow < activeRow;
}

const changePseudoDailyWord = (dailyWord, letter, color) => {
    if (color === "yellow" && [...dailyWord].filter((item) => item === letter).length > 1) {
        return dailyWord;
    }
    return dailyWord.replace(letter, ' ');
}

export const Row = ({ className, word, dailyWord, activeRow, nth }) => {

    const row = [];
    let color = '';
    let pseudoDailyWord = dailyWord;

    for (let i = 0; i < 5; i++) {
        if (isFilledRow(nth, activeRow)) color = setCellColor(word, pseudoDailyWord, i);
        if (color === "green" || color === "yellow") {
            pseudoDailyWord = changePseudoDailyWord(pseudoDailyWord, word[i], color);
        }
        row.push(<Cell nth={i} color={isFilledRow(nth, activeRow) ? color : ''}
            value={word[i] ? word[i] : ''} key={i} />);
    };

    return (
        <div className={classNames(className, styles.row)}>
            {row}
        </div>
    )
}
