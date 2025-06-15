"use client";
import { useAppConfig, SubmitKey } from "@/app/store/config";
import styles from "../styles/settings.module.scss";
import { useEffect } from "react";

enum Theme {
    Auto = "auto",
    Light = "light",
    Dark = "dark",
}

export function Settings() {
    const config = useAppConfig();
    const {
        theme,
        updateTheme,
        fontSize,
        updateFontSize,
        submitKey,
        tightBorder,
        enableAutoGenerateTitle,
        setConfig
    } = config;

    useEffect(() => {
        console.log("Current theme:", theme, typeof theme);
    }, [theme]);

    const themeOptions = [
        { value: Theme.Auto, label: "自动" },
        { value: Theme.Light, label: "浅色" },
        { value: Theme.Dark, label: "深色" },
    ];

    const fontSizeOptions = [12, 13, 14, 15, 16, 18, 20];

    const handleThemeChange = (selectedTheme: Theme) => {
        console.log("Updating theme to:", selectedTheme);
        updateTheme(selectedTheme);
    };


    const handleFontSizeChange = (size: number) => {
        updateFontSize(size);
    };

    const handleToggleChange = (key: string, value: boolean) => {
        setConfig({ [key]: value });
    };

    return (
        <div className={styles["settings-container"]}>
            {/* 主题设置 */}
            <div className={styles["settings-section"]}>
                <div className={styles["settings-label"]}>界面主题</div>
                <div className={styles["theme-options"]}>
                    {themeOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`${styles["theme-button"]} ${theme === option.value ? styles["active"] : ""}`}
                            onClick={() => handleThemeChange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>


            {/* 字体大小设置 */}
            <div className={styles["settings-section"]}>
                <div className={styles["settings-label"]}>字体大小</div>
                <div className={styles["theme-options"]}>
                    {fontSizeOptions.map((size) => (
                        <button
                            key={size}
                            className={`${styles["theme-button"]} ${fontSize === size ? styles["active"] : ""}`}
                            onClick={() => handleFontSizeChange(size)}
                        >
                            {size}px
                        </button>
                    ))}
                </div>
            </div>

            {/* 开关设置 */}
            <div className={styles["settings-section"]}>
                <div className={styles["settings-label"]}>其他设置</div>
                <div className={styles["toggle-container"]}>
                    <div className={styles["toggle-item"]}>
                        <label>紧凑边框</label>
                        <input
                            type="checkbox"
                            checked={tightBorder}
                            onChange={(e) => handleToggleChange("tightBorder", e.target.checked)}
                        />
                    </div>
                    <div className={styles["toggle-item"]}>
                        <label>自动生成标题</label>
                        <input
                            type="checkbox"
                            checked={enableAutoGenerateTitle}
                            onChange={(e) => handleToggleChange("enableAutoGenerateTitle", e.target.checked)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}