import { createContext } from "react";
import RoomState from "./room";
import ChatState from "./chat";
import AuthState from "./auth";
import useRealtimeConnection from "../hooks/useWebSocket";
import AppState from "./app";

export const AppContext = createContext<{
    room: any;
    chat: any;
    auth: any;
    app: any;
    connection: any;
    // @ts-expect-error
}>({});

export default function ContextWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: appData, actions: appActions } = AppState();
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

    const changeRoom = (room: any) => {
        roomActions.changeRoom(room);
        chatActions.setMessages([]);
        connection.connect(room._id);
    };

    return (
        <AppContext.Provider
            value={{
                room: { ...roomData, ...roomActions, changeRoom },
                chat: { ...chatData, ...chatActions },
                auth: { ...authData, ...authActions },
                app: { ...appData, ...appActions },
                connection,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
