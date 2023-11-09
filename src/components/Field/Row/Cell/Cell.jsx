import styles from "./Cell.module.scss";
import classNames from "classnames";

export const Cell = ({ nth, value, color }) => {

    return (
        <div className={styles.container}>
            <div className={classNames(styles.cell, (color ? styles.cell__active : ''), styles[`cell_${nth}`])}>
                <div className={styles.cell__front}>{value}</div>
                <div className={classNames(styles.cell__back, (color ? styles[`cell__back_${color}`] : ''))}>{value}</div>
            </div>
        </div>
    )
}