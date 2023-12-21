import React from "react";

import styles from "../chat.module.scss";

/** Message bubble */
export default function Message({
    message = "",
    time = "",
    user = "",
    isUser = false,
}) {
    return (
        <div
            className={[
                styles.bubble,
                isUser ? styles.sent : styles.received,
            ].join(" ")}
        >
            <span className={isUser ? styles.tail_out : styles.tail_in}></span>
            {isUser ? null : <div className={styles.username}>{user}</div>}
            <div className={styles.chat}>{message}</div>
        </div>
    );
}
