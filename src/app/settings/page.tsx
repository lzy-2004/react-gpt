import { Settings } from "@/app/components/settings";
import styles from "./page.module.scss";
export default function SettingsPage() {
    return (
        <div>
            <h1 className={styles.myH1}>设置</h1>
            <Settings />
        </div>
    );
}