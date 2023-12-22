import React, { useContext, useEffect } from "react";
import Room from "./sidebar/Room";
import { AppContext } from "../../context";
import { loadUserRooms } from "../../misc/room";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./sidebar.module.scss";

export default function SideBar() {
    const {
        auth: { user },
        room: { rooms, setRooms, currentRoom, changeRoom },
    } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        async function getMyRooms() {
            const { data } = await loadUserRooms(user._id);
            setRooms(data);
        }

        if (user) {
            getMyRooms();
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <button className={styles.button} onClick={() => router.back()}>
                    <Image
                        src="/back.svg"
                        alt="back button"
                        width={24}
                        height={24}
                    />
                </button>
                Not Whatsapp
            </div>
            <div className={styles.rooms}>
                {/* <Room name="Room 1" />
                <Room name="Room 2" /> */}
                {rooms?.map((room: any) => (
                    <>
                        {console.log(currentRoom, room)}
                        <Room
                            isCurrent={room._id === currentRoom?._id}
                            name={room.name}
                            link={room.url}
                            onClick={() => {
                                changeRoom(room);
                            }}
                        />
                    </>
                ))}
            </div>
        </div>
    );
}
