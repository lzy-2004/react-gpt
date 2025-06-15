import styles from "./home.module.scss";
import Image from "next/image";
import chatGptIcon from "../icons/chatgpt.svg";

import Locale from "../locales";


import {
    DEFAULT_SIDEBAR_WIDTH,
    MAX_SIDEBAR_WIDTH,
    MIN_SIDEBAR_WIDTH,
    NARROW_SIDEBAR_WIDTH,
    Path,
    REPO_URL,
} from "../constant";

import dynamic from "next/dynamic";
import { useNavigate } from "react-router-dom";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
    loading: () => null,
});

export function SideBar() {

    const navigate = useNavigate();

    return (
        <div
            className={styles.sidebar}
        >
            <div className={styles["sidebar-header"]} data-tauri-drag-region>
                <div className={styles["sidebar-title"]} data-tauri-drag-region>
                    NextChat
                </div>
                <div className={styles["sidebar-sub-title"]}>
                    Build your own AI assistant.
                </div>
                <div className={styles["sidebar-logo"] + " no-dark"}>
                    <Image src={chatGptIcon} alt="logo" />
                </div>
            </div>

            <button
                className={styles["new-chat-button"]}
                onClick={() => {
                    navigate(Path.Masks)
                }}
            >{Locale.Chat.NewChat}</button>

            <div
                className={styles["sidebar-body"]}
            >
                <ChatList />
            </div>
            <button
                className={styles["new-chat-button"]}
                onClick={() => navigate("/settings")}
            >
                设置
            </button>
        </div>
    );
}