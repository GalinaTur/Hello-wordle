import React from "react";
import styles from "./Field.module.scss";
import { Row } from "./Row/Row";

export const Field = ({ words, dailyWord, activeRow, activeRowRef }) => {

    const rows = [];

    for (let i = 0; i < 6; i++) {
        rows.push(<Row activeRowRef={activeRowRef} className={`row-${i}`} nth={i} word={words[i] ? words[i] : ''} key={i} dailyWord={dailyWord} activeRow={activeRow}/>)
    }

    return (
        <div className={styles.field}>
            {rows}
        </div>
    )
}