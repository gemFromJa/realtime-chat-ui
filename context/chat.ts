import { useState } from "react";

export default function ChatState() {
    const [messages, setMessages] = useState<
        { user: String; message: String }[]
    >([]);

    return {
        data: { messages },
        actions: {
            setMessages,
        },
    };
}
