import React from "react";
import styles from "./KeyboardBtn.module.scss";
import classNames from "classnames";


export const KeyboardBtn = ({ className, btnKey, onClick }) => {

    if (btnKey === 'backspace') {
        return (
            <button className={classNames(className, styles.button, styles.backspace)} 
            data-key='backspace' onClick={onClick}></button>
        )
    } else if (btnKey === 'enter') {
        return (
            <button className={classNames(className, styles.button)} 
            data-key='enter' onClick={onClick}>{btnKey}</button>
        )
    } else {
        return (
            <button className={classNames(className, styles.button)} 
            data-key={btnKey} data-color='' onClick={onClick}>{btnKey}</button>
        )
    }
}