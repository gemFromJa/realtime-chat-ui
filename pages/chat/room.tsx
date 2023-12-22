import React from "react";
import Chatroom from "../../components/chatroom";
import styles from "../../styles/Home.module.css";
import globalStyles from "../../styles/global.module.scss";
import join from "../../misc/join";

export default function chat() {
    return (
        <div className={join(globalStyles.container, styles.container)}>
            <Chatroom />
        </div>
    );
}
