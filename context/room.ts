import React, { useState } from "react";

export default function RoomState() {
    const [rooms, setRooms] = useState<{ name: String; url: String }[]>([]);
    const [currentRoom, changeRoom] = useState<{
        name: string;
        _id: string;
    } | null>(
        /* null */ { _id: "65831b373da0765b80fd44d0", name: "first room" }
    );
    const [currentMembers, setMembers] = useState<any[]>([]);

    return {
        data: { rooms, currentMembers, currentRoom },
        actions: {
            setRooms,
            changeRoom,
            setMembers,
        },
    };
}
