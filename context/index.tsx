import { createContext } from "react";
import RoomState from "./room";
import ChatState from "./chat";
import AuthState from "./auth";
import useRealtimeConnection from "../hooks/useWebSocket";

export const AppContext = createContext<{
    room: any;
    chat: any;
    auth: any;
    connection: any;
}>({});

export default function ContextWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: roomData, actions: roomActions } = RoomState();
    const { data: chatData, actions: chatActions } = ChatState();
    const { data: authData, actions: authActions } = AuthState();
    const connection = useRealtimeConnection((data: any) => {
        if (data) {
            const { meta, message } = data;

            if (meta === "message") {
                chatActions.setMessages((messages) => [...messages, message]);
            }
        }
    });

    return (
        <AppContext.Provider
            value={{
                room: { ...roomData, ...roomActions },
                chat: { ...chatData, ...chatActions },
                auth: { ...authData, ...authActions },
                connection,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
