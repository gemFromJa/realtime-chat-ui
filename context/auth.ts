import { useState } from "react";

export default function AuthState() {
    const [user, setUser] = useState<{
        _id: string;
        name: String;
        username: String;
    }>(/* {
        _id: "658316e8e41375e9702099f9",
        name: "tom",
        username: "tom",
    } */);

    return {
        data: { user },
        actions: {
            setUser,
        },
    };
}
