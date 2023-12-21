import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import SideBar from "./SideBar";
import Chat from "./Chat";

import styles from "./style.module.scss";

export default function Chatroom() {
    const {
        connection: { connect },
        room: { currentRoom },
    } = useContext(AppContext);

    useEffect(() => {
        connect(currentRoom._id);
    }, []);

    return (
        <div className={styles.chatroom}>
            <SideBar />
            <Chat />
        </div>
    );
}
