import styles from "./ModalGameOver.module.scss";
import { Stats } from "../../Stats/Stats";
import {useEffect, useRef} from 'react';
import {Container} from '../../Container/Container'

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
    const modalRef = useRef(null);

useEffect(()=> {
    if (gameStatus === 'win' || gameStatus === 'lose') {
        modalRef.current.showModal();
    }  else modalRef.current.close();
}, [gameStatus]);

    return (
        <dialog ref={modalRef} className={styles.modal}>
                        <Container className={styles.container}>
                {message}
                <Stats gameStatus={gameStatus} winRow={winRow}/>
                <button className={styles.newGamebtn} onClick={handleStartNewGameClick}>Start New Game!</button>
                {/* <button onClose={() => handleClose()} className={styles.closeBtn}>X</button> */}
                </Container>
        </dialog>
    )
}