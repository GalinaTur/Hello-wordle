import styles from "./Cell.module.scss";
import classNames from "classnames";

export const Cell = ({ value, color }) => {
    return (
        <div className={classNames(styles.cell, (styles[`cell-${color}`] || ''))}>{value}</div>
    )
}