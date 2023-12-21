import React from "react";

import styles from "../sidebar.module.scss";

export default function Room({ name = "", isCurrent = false, link = "" }) {
    return (
        <div
            className={[styles.room, isCurrent ? styles.currentRoom : ""].join(
                " "
            )}
        >
            {name}
        </div>
    );
}
