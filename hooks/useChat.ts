import { useContext } from "react";
import { AppContext } from "../context";
import axios from "axios";
import { API } from "../constants";

export default function useChat() {
    const {
        auth: { user },
        chat: { messages, setMessages },
        room: { currentRoom, currentMembers, setMembers, changeRoom },
    } = useContext(AppContext);

    // fetch the messages
    const fetchRoomInfo = async () => {
        const { data } = await axios.get(`${API}/room/${currentRoom?._id}`);

        if (data.error) {
            // TODO: handle error
        }

        const { data: room } = data;

        changeRoom({ name: room.name, _id: room._id });
        setMessages(room.messages);
        setMembers(room.members);
    };

    const sendMessage = async (message: string) => {
        const { data } = await axios.post(
            `${API}/room/${currentRoom?._id}/message`,
            {
                message: message.trim(),
                user_id: user?._id,
            }
        );

        return data;
    };

    return {
        changeRoom,
        currentMembers,
        messages,
        fetchRoomInfo,
        sendMessage,
    };
}
