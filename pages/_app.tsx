import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import ContextWrapper from "../context";
import styles from "../styles/global.module.scss";
import "../styles/globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ContextWrapper>
            <main className={[poppins.className, styles.root].join(" ")}>
                <Component {...pageProps} />
            </main>
        </ContextWrapper>
    );
}
