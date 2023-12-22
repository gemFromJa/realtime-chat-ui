import React, { useEffect, useState } from "react";
import { createRoom } from "../../misc/room";
import join from "../../misc/join";

import styles from "./styles.module.scss";
import globalStyles from "../../styles/global.module.scss";

const ID = "modal-bg";

export default function CreateRoom({ close }: { close: Function }) {
    const [name, setName] = useState("");

    const onCreateRoomClick = async () => {
        const { success } = await createRoom(name);

        if (success) {
            close();
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as Element)?.id === ID) close();
        };

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div id={ID} className={styles.modal}>
            <main className={styles.modalContent}>
                <h3 className={styles.title}>Create Room</h3>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter room name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className={join(globalStyles.btn, styles.btn)}
                    disabled={!name}
                    onClick={onCreateRoomClick}
                >
                    Create
                </button>
            </main>
        </div>
    );
}
