import React from "react";
import styles from "./ModalGameOver.module.scss";

let message = '';

const setGameOverModal = (gameStatus, dailyWord) => {
    if (gameStatus === 'win') {
        message = <div className={styles.modalTextWin}><h3>Well done!</h3>
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

export const ModalGameOver = ({ gameStatus, dailyWord, handleStartNewGameClick }) => {

    setGameOverModal(gameStatus, dailyWord);

    return (
        <div id="modal" className={styles.modalCover} hidden={gameStatus === 'in progress'}>
            <div className={styles.modal}>
                {message}
                <button className={styles.newGamebtn} onClick={handleStartNewGameClick}>Start New Game!</button>
            </div>
        </div>
    )
}