import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import SideBar from "./SideBar";
import Chat from "./Chat";

import styles from "./style.module.scss";
import { useRouter } from "next/router";

export default function Chatroom() {
    const router = useRouter();
    const {
        auth: { user },
        connection: { connect },
        room: { currentRoom },
    } = useContext(AppContext);

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            // connect(currentRoom._id);
        }
    }, []);

    if (!user) return <></>;
    return (
        <div className={styles.chatroom}>
            <SideBar />
            <Chat />
        </div>
    );
}
