
import styles from "./Header.module.scss";
import infoIcon from "../../assets/img/info.svg";
import { Container } from "../Container/Container";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <div><div>---</div>
                <div>---</div></div>
                <h1 className="header__title">Hello, Wordle</h1>
                <a><img className={styles.info} src={infoIcon} /></a>
            </Container>
        </header>
    )
}