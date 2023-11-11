import React from "react";
import styles from "./ModalGameOver.module.scss";
import classNames from 'classnames';
import { Stats } from "../../Stats/Stats";

let message = '';

const setGameOverModal = (gameStatus, dailyWord) => {
    if (gameStatus === 'win') {
        message = <div className={styles.modalTextWin}><h2>Well done!</h2>
            <p>You guess the word</p>
            <p className={styles.dailyWord}>{dailyWord}</p>
            </div>;
    } else if (gameStatus === 'lose') {
        message = <div className={styles.modalTextLose}><h3>You lose!</h3>
            <p>Correct word was <span className={styles.dailyWord}>{dailyWord}</span></p>
            <p>Don't worry, try again!</p>
        </div>;
    }
}

export const ModalGameOver = ({ gameStatus, dailyWord, handleStartNewGameClick, winRow }) => {

    setGameOverModal(gameStatus, dailyWord);

    return (
        <div id="modal" className={classNames(styles.modalCover, (gameStatus !== 'in progress'? styles.modalCover__active : ''))}>
            <div className={styles.modal}>
                {message}
                <div className={styles.statsContainer}>
                <Stats gameStatus={gameStatus} winRow={winRow}/>
                </div>
                <button className={styles.newGamebtn} onClick={handleStartNewGameClick}>Start New Game!</button>
            </div>
        </div>
    )
}