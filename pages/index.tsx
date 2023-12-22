import Account from "../components/auth";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Account />
        </div>
    );
}
