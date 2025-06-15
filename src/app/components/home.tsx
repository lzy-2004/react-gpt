"use client";

import { Routes, Route, HashRouter as Router } from "react-router-dom";
import styles from "./home.module.scss";
import { MaskPage } from "./mask-page";
import { SideBar } from "./sidebar";
import { Path } from "../constant";
import Chat from "./chat";
import SettingsPage from "../settings/page";
import { ThemeProvider } from "./theme-provider";

export default function Home() {
    return (
        <ThemeProvider>
            <Router>
                <div className={styles.container}>
                    <SideBar />

                    <div className={styles["window-content"]} >
                        <Routes>
                            <Route path={Path.Chat} element={<Chat />} />
                            <Route path={Path.Home} element={<MaskPage />} />
                            <Route path={Path.Masks} element={<MaskPage />} />
                            <Route path={Path.Settings} element={<SettingsPage />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}