import React, { useContext, useState } from "react";

import styles from "./styles.module.scss";
import globalStyles from "../../styles/global.module.scss";
import { AppContext } from "../../context";
import { login, signup } from "../../misc/auth";
import { useRouter } from "next/router";
import join from "../../misc/join";

export default function Account() {
    const [createMode, setCreateMode] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        auth: { setUser },
    } = useContext(AppContext);

    function toggleMode() {
        setCreateMode((mode) => !mode);
    }

    async function doLogin() {
        const { data, error, ...rest } = await login({ username });

        console.log("WILL LOGIN", username, data, error, rest);
        if (data) {
            setUser(data);
            router.push("/chat");
        } else {
            setError(error || "Unable to login");
        }
    }

    async function doSignup() {
        const { data, error } = await signup({ name, username });

        if (data) {
            await doLogin();
        } else {
            setError(error || "Unable to signup");
        }
    }

    const onClick = createMode ? doSignup : doLogin;
    return (
        <div className={styles.page}>
            <div className={styles.contentArea}>
                <h3 className={styles.title}>
                    {createMode ? "Signup" : "Login"}
                </h3>
                {error ? <p className={styles.error}>{error}</p> : null}
                {createMode ? (
                    <div className={styles.inputField}>
                        <label className={styles.label}>Name</label>
                        <input
                            className={styles.input}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                ) : null}
                <div className={styles.inputField}>
                    <label className={styles.label}>Username</label>
                    <input
                        className={styles.input}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button
                        className={join(globalStyles.btn, styles.btn)}
                        onClick={onClick}
                    >
                        {createMode ? "Create Account" : "Login"}
                    </button>
                    <button
                        className={join(globalStyles.btn, styles.textButton)}
                        onClick={toggleMode}
                    >
                        {createMode
                            ? "Have account? Login"
                            : "First time? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
