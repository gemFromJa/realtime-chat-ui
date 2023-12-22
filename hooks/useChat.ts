import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { loadRoom, sendMessage as sendMessageToServer } from "../misc/room";

export default function useChat() {
    const {
        app: { language },
        auth: { user },
        chat: { messages, setMessages },
        room: { currentRoom, currentMembers, setMembers, setRooms, changeRoom },
    } = useContext(AppContext);

    // fetch the messages
    const fetchRoomInfo = async () => {
        console.log("FETCHING FOR ROOM DATA: ", currentRoom);
        if (currentRoom) {
            const { data, error } = await loadRoom(currentRoom._id);
            if (error) {
                // TODO: handle error
            } else {
                // changeRoom((_room: any) => ({ ..._room, name: room.name }));
                setMessages(() => data.messages);
                setMembers(() => data.members);
            }
        }
    };

    const sendMessage = async (message: string) => {
        const data = await sendMessageToServer({
            language,
            message,
            user_id: user?._id,
            room_id: currentRoom._id,
        });

        return data;
    };

    useEffect(() => {
        fetchRoomInfo();
    }, [currentRoom?._id]);

    return {
        changeRoom,
        currentMembers,
        messages,
        fetchRoomInfo,
        sendMessage,
    };
}
