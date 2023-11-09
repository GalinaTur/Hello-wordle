import React from "react";
import { Row } from "../../Field/Row/Row";
import styles from "./ModalRules.module.scss";
import classNames from "classnames";

export const ModalRules = ({ id, handleClick }) => {

    return (
        <dialog id={id} className={styles.modalCover}>
            <div className={styles.modal}>
                <h2 className={styles.title}>
                    How to play
                </h2>
                <div className={styles.container}>
                    <h3 className={styles.subtitle}>Guess the Wordle in 6 tries.</h3>
                    <ul>
                        <li>Each guess must be a valid 5-letter word.</li>
                        <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    </ul>
                    <div>
                        <h3>Examples:</h3>
                        <div className={styles.example}>
                            <Row className={classNames(styles.cells, styles.cells_1)} word="ALPHA" dailyWord='' activeRow='' nth='' />
                            <p><span className={styles.bold}>A</span> is in the word and in the correct spot.</p>
                        </div>
                        <div className={styles.example}>
                            <Row className={classNames(styles.cells, styles.cells_2)} word="DELTA" dailyWord='' activeRow='' nth='' />
                            <p><span className={styles.bold}>L</span> is in the word but in the wrong spot.</p>
                        </div>
                        <div className={styles.example}>
                            <Row className={classNames(styles.cells, styles.cells_3)} word="SIGMA" dailyWord='' activeRow='' nth='' />
                            <p><span className={styles.bold}>M</span> is not in the word in any spot.</p>
                        </div>
                        <small>Original game: <a href='https://www.nytimes.com/games/wordle/index.html' target='_blank' rel="noreferrer">WORDLE</a>© 2023 by NYTimes</small>
                    </div>
                </div>
            </div>
            <button onClick={() => handleClick()} className={styles.closeBtn}>X</button>
        </dialog>
    )
}

