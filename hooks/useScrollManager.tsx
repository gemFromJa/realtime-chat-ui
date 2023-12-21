import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context";

export default function useScrollManager() {
    const [userHasScrolled, setHasScrolled] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const {
        chat: { messages },
    } = useContext(AppContext);

    useEffect(() => {
        if (elementRef.current && !userHasScrolled) {
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }, [elementRef.current, messages]);

    const goToBottom = () => {
        setHasScrolled(false);
    };

    return {
        elementRef,
        goToBottom,
    };
}
