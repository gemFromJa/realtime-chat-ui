import React, { useContext } from "react";

import styles from "./sidebar.module.scss";
import Room from "./sidebar/Room";
import { AppContext } from "../../context";

export default function SideBar() {
    const {
        room: { rooms, currentRoom },
    } = useContext(AppContext);
    return (
        <div className={styles.container}>
            <div className={styles.top}>Not Whatsapp</div>
            <div className={styles.rooms}>
                <Room name="Room 1" />
                <Room name="Room 2" />
                {rooms.map((room: any) => (
                    <Room name={room.name} link={room.url} />
                ))}
            </div>
        </div>
    );
}
