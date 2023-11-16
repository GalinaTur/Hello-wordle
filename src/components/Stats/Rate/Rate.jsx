import styles from "./Rate.module.scss";

export const Rate = ({ title, value}) => {

    return (
        <div className={styles.rate}>
            <p className={styles.amount}>{value}</p>
            <p className={styles.title}>{title}</p>
        </div>
    )
}