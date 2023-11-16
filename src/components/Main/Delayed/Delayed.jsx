import { useState, useEffect } from "react";

export const Delayed = ({ children }) => {
    const [isShown, setIsSHown] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsSHown(true);
        }, 1800);

        return () => clearTimeout(delay);
    })

    return isShown && children;
}