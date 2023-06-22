import styles from "./Header.module.scss";
import { useState } from "react";
import { Container } from "../Container/Container";
import { ModalRules } from "./ModalRules/ModalRules";

export const Header = () => {

    const [isModalActive, setIsModalActive] = useState(false);

    const handleClick=()=> {
        const modalRules = document.getElementById('modalRules');
        isModalActive? modalRules.close(): modalRules.showModal();
        setIsModalActive((prev) => !prev);
    }

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
            <button className={styles.menu}></button>
                <h1 className="header__title">Hello, Wordle</h1>
                <button className={styles.info} onClick={()=>handleClick()}></button>
            </Container>
            <ModalRules id='modalRules' isActive={isModalActive} handleClick={handleClick}/>
        </header>
    )
}