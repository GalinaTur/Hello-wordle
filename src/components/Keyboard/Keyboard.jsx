import React from "react";
import styles from "./Keyboard.module.scss";
import { KeyboardBtn } from "./KeyboardBtn/KeyboardBtn";

export const Keyboard = ({ handleEnterClick, handleBackspaceClick, handleClick }) => {
    return (
        <div className={styles.keyboard}>
            <div className={styles.row}>
                <KeyboardBtn className="keyboard__button" btnKey='q' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='w' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='e' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='r' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='t' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='y' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='u' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='i' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='o' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='p' onClick={handleClick} />
            </div>
            <div className={styles.row}>
                <KeyboardBtn className="keyboard__button" btnKey='a' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='s' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='d' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='f' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='g' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='h' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='j' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='k' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='l' onClick={handleClick} />
            </div>
            <div className={styles.row}>
                <KeyboardBtn className="keyboard__button" btnKey='enter' onClick={handleEnterClick} />
                <KeyboardBtn className="keyboard__button" btnKey='z' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='x' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='c' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='v' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='b' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='n' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='m' onClick={handleClick} />
                <KeyboardBtn className="keyboard__button" btnKey='backspace' onClick={handleBackspaceClick} />
            </div>
        </div>
    )
}
