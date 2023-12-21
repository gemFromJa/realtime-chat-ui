import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { WS_API } from "../constants";

export default function useRealtimeConnection(handleNewMessages: Function) {
    // const [room, setRoom] = useState("65831b373da0765b80fd44d0");
    const { sendJsonMessage, lastJsonMessage, lastMessage } =
        useWebSocket(WS_API);

    function connect(room: string) {
        sendJsonMessage({
            meta: "join",
            room,
        });
    }
    function leave(room: string) {
        sendJsonMessage({
            meta: "leave",
            room,
        });
    }

    function sendText(room: string, text: string) {
        sendJsonMessage({
            room,
            message: text,
        });
    }

    useEffect(() => {
        handleNewMessages(lastJsonMessage);
    }, [lastJsonMessage]);

    return {
        connect,
        leave,
        sendText,
    };
}
