import React from "react";
import styles from "./ModalHint.module.scss";

export const ModalHint = ({message}) => {

    return (
        <div className={styles.modal} hidden={!message}>
            {message}
        </div>
    )
}