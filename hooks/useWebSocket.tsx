import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { WS_API } from "../constants";

export default function useRealtimeConnection(handleNewMessages: Function) {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_API);

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
