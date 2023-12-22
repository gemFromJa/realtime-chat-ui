import React, { useContext } from "react";

import styles from "../chat.module.scss";
import { AppContext } from "../../../context";

/** Message bubble */
export default function Message({
    message = "",
    lang,
    translations,
    time = "",
    user = "",
    isUser = false,
}: {
    user: String;
    isUser: Boolean;
    message: String;
    lang: String;
    translations: [Translation];
    time: String | Date;
}) {
    const {
        app: { language: userLanguage },
    } = useContext(AppContext);
    const text =
        lang === userLanguage
            ? message
            : translations.find((t: any) => t.lang === userLanguage)?.message ||
              "";
    return (
        <div
            className={[
                styles.bubble,
                isUser ? styles.sent : styles.received,
            ].join(" ")}
        >
            <span className={isUser ? styles.tail_out : styles.tail_in}></span>
            {isUser ? null : <div className={styles.username}>{user}</div>}
            <div className={styles.chat}>{text}</div>
        </div>
    );
}
