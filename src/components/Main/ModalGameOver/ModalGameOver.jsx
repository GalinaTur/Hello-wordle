import React from "react";
import styles from "./ModalGameOver.module.scss";

let message = '';

const setGameOverModal = (gameStatus, dailyWord) => {
    if (gameStatus === 'win') {
        message = <div className={styles.modalTextWin}><h3>Well done!</h3>
            <p>You guess the word</p>
            <p className={styles.dailyWord}>{dailyWord}</p></div>;
    } else if (gameStatus === 'lose') {
        message = <div className={styles.modalTextLose}><h3>You lose!</h3>
            <p>Don't worry, try again!</p>
            <p>Correct word was <p className={styles.dailyWord}>{dailyWord}</p></p></div>;
    }
}

export const ModalGameOver = ({ gameStatus, dailyWord }) => {

    setGameOverModal(gameStatus, dailyWord);

    return (
        <div className={styles.modalCover} hidden={gameStatus === 'in progress'}>
        <div className={styles.modal}>
                {message}
        </div>
        </div>
    )
}