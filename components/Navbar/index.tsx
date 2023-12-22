import React, { useContext } from "react";

import styles from "./styles.module.scss";
import { AppContext } from "../../context";
import Link from "next/link";
import { SUPPORTED_LANGUAGES } from "../../misc/constants";

export default function Navbar({ hideName = false }) {
    const {
        auth: { user },
        app: { language, setLanguage },
    } = useContext(AppContext);
    return (
        <div className={styles.nav}>
            <div className={styles.content}>
                <div className={styles.company}>
                    {hideName ? "" : "Not Whatsapp"}
                </div>
                <div className={styles.actions}>
                    <Link href={"/chat/room"} className={styles.link}>
                        My Chats
                    </Link>
                    <span className={styles.greeting}>
                        Hey
                        <span className={styles.name}>, {user?.name}</span>
                    </span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <option value={lang.code}>{lang.language}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
