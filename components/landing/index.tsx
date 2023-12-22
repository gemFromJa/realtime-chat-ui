import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { joinRoom, loadRooms } from "../../misc/room";
import { useRouter } from "next/router";
import CreateRoom from "./CreateRoom";
import Navbar from "../Navbar";
import join from "../../misc/join";

import styles from "./styles.module.scss";
import globalStyles from "../../styles/global.module.scss";

export default function Landing() {
    const {
        auth: { user },
        room: { changeRoom },
    } = useContext(AppContext);
    const [rooms, setRooms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    async function loadData() {
        try {
            let { data } = await loadRooms();

            console.log("LA DATA", data);

            setRooms(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        if (user) {
            loadData();
        } else {
            if (router) router.replace("/");
        }
    }, []);

    const close = async () => {
        if (await loadData()) {
            setModalVisible(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className={join(globalStyles.container, styles.page)}>
                <div className={styles.roomContainer}>
                    <div
                        className={[styles.room, styles.newRoom].join(" ")}
                        onClick={() => {
                            setModalVisible(true);
                            console.log("Done");
                        }}
                    >
                        <div className={styles.plus} />
                        <p>Create a Room</p>
                    </div>
                    {rooms.map((room: any) => {
                        return (
                            <div className={styles.room}>
                                <div className={styles.bottom}>
                                    <p className={styles.roomName}>
                                        {room.name}
                                    </p>
                                    <p className={styles.member}>
                                        {room.total_members} members
                                    </p>
                                </div>
                                <button
                                    className={join(
                                        globalStyles.btn,
                                        styles.join
                                    )}
                                    onClick={async () => {
                                        const { success, error } =
                                            await joinRoom(room._id, user._id);

                                        if (success) {
                                            changeRoom(room);
                                            router.push("/chat/room");
                                        } else {
                                            // TODO: handle error
                                        }
                                    }}
                                >
                                    Join
                                </button>
                            </div>
                        );
                    })}
                </div>
                {modalVisible ? <CreateRoom close={close} /> : null}
            </div>
        </>
    );
}
