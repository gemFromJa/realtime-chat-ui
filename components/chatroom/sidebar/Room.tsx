import React, { useContext } from "react";

import styles from "../sidebar.module.scss";
import join from "../../../misc/join";

export default function Room({
    name = "",
    onClick = () => {},
    isCurrent = false,
    link = "",
}) {
    return (
        <div
            className={join(styles.room, isCurrent ? styles.active : "")}
            onClick={onClick}
        >
            <span className={styles.roomName}>{name}</span>
        </div>
    );
}
