import React from "react";
import styles from "./Modal.module.scss";

export const Modal = ({message}) => {

const isHidden = true;

    return (
        <div className={styles.modal} hidden={!message}>
            {message}
        </div>
    )
}