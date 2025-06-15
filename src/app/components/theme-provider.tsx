import { useAppConfig } from "@/app/store/config";
import { Theme } from "@/app/store/config";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useAppConfig(state => state.theme);

    useEffect(() => {
        // 移除所有主题相关的类
        document.body.classList.remove("light", "dark");

        // 根据当前主题设置类名
        if (theme === Theme.Light) {
            document.body.classList.add("light");
        } else if (theme === Theme.Dark) {
            document.body.classList.add("dark");
        } else if (theme === Theme.Auto) {
            // 自动模式下，根据系统偏好设置主题
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.classList.add(prefersDark ? "dark" : "light");

            // 监听系统主题变化
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = (e: MediaQueryListEvent) => {
                document.body.classList.remove("light", "dark");
                document.body.classList.add(e.matches ? "dark" : "light");
            };

            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [theme]);

    return <>{children}</>;
}