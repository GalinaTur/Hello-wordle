import styles from "./Header.module.scss";
import { useState, useRef, useEffect } from "react";
import { Container } from "../Container/Container";
import { ModalHeader } from "./ModalHeader/ModalHeader";

export const Header = ({ statsBtnRef, gameStatus }) => {

    const [activeModalType, setActiveModalType] = useState();
    const modalRef = useRef(null);
    const modal = modalRef.current;

    const handleClick = (e) => {
        if (e.target.id === 'statsBtn') {
            setActiveModalType('stats');
            modal.showModal();
        } else if (e.target.id === 'rulesBtn') {
            setActiveModalType('rules');
            modal.showModal();
        } else if (e.target.id === 'closeBtn' || e.target.nodeName.toLowerCase() === 'dialog') {
            setActiveModalType(null);
            modal.close();
        };
    }

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <button id='statsBtn' className={styles.stats} ref={statsBtnRef} onClick={handleClick}></button>
                <h1 className="header__title">Hello, Wordle</h1>
                <button id='rulesBtn' className={styles.info} onClick={handleClick}></button>
            </Container>
            <ModalHeader modalRef={modalRef} type={activeModalType} handleClick={handleClick} gameStatus={gameStatus}/>
        </header>
    )
}