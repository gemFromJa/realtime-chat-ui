import React, { useState } from "react";

export default function RoomState() {
    const [rooms, setRooms] = useState<{ name: String; url: String }[]>([]);
    const [currentRoom, changeRoom] = useState<{
        name: string;
        _id: string;
    } | null>();
    /* null */
    const [currentMembers, setMembers] = useState<any[]>([]);

    console.log("CURRENT ROOM", currentRoom);

    return {
        data: { rooms, currentMembers, currentRoom },
        actions: {
            setRooms,
            changeRoom,
            setMembers,
        },
    };
}
