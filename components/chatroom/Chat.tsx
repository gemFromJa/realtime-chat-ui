import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import styles from "./chat.module.scss";
import Message from "./chat/Message";
import { AppContext } from "../../context";
import useChat from "../../hooks/useChat";
import useScrollManager from "../../hooks/useScrollManager";

export default function Chat() {
    const [text, setText] = useState("");
    const { elementRef } = useScrollManager();
    const { messages, fetchRoomInfo, sendMessage } = useChat();
    const {
        // chat: { messages },
        auth: { user },
    } = useContext(AppContext);

    useEffect(() => {
        fetchRoomInfo();
    }, []);

    const onSend = async () => {
        const result = await sendMessage(text);

        if (result.success) {
            setText("");
        } else {
            // TODO: handle error
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <input
                    placeholder="Search messages"
                    className={styles.search}
                />
            </div>
            <div className={styles.chatarea} ref={elementRef}>
                {/*  
                <Message user="looli" message="Okay!" />
                <Message user="Miela" message="Who is calling my name!" />
                <Message user="sheela" message="I will fuck you up!" />
                <Message user="tom" message="I will fuck you up!" /> */}
                {messages?.map(
                    ({ user_id: { username: sender, _id }, message }: any) => (
                        <Message
                            user={sender}
                            message={message}
                            isUser={_id === user?._id}
                        />
                    )
                )}
            </div>
            <div className={styles.message}>
                <textarea
                    style={{ height: "52px" }}
                    className={styles.textarea}
                    placeholder="Type your message here..."
                    value={text}
                    onChange={(e) => {
                        const element = e.currentTarget;
                        setText(element.value);
                        element.style.height = "1px";
                        element.style.height = `${Math.min(
                            200,
                            element.scrollHeight
                        )}px`;
                    }}
                />
                <div className={styles.button} onClick={onSend}>
                    <Image
                        src="/send.svg"
                        alt="send message icon"
                        width={48}
                        height={48}
                    />
                </div>
            </div>
        </div>
    );
}
