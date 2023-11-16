import React from "react";
import { Row } from "../../Field/Row/Row";
import styles from "./ModalHeader.module.scss";
import classNames from "classnames";
import { Stats } from "../../Stats/Stats";
import { Container } from "../../Container/Container";

export const ModalHeader = ({ modalRef, type, handleClick, gameStatus }) => {

    const setModalContent = (type) => {
        if (type === 'stats') {
            return <Stats gameStatus={gameStatus} winRow='0' />
        } else if (type === 'rules') {
            return (<>
                <h3 className={styles.title}>
                    How to play
                </h3>

                <h4 className={styles.subtitle}>Guess the Wordle in 6 tries.</h4>
                <ul>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>The color of the tiles will change to show how close your guess was to the word.</li>
                </ul>
                <div>
                    <h4>Examples:</h4>
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
            </>)
        }
    }

    return (
        <dialog ref={modalRef} className={styles.modal} onClick={handleClick}>
                <Container className={styles.container}>
                    {setModalContent(type)}
                </Container>
            <button id='closeBtn' onClick={handleClick} className={styles.closeBtn}>X</button>
        </dialog>
    )
}

