export const getBuildConfig = () => {
    if (typeof process === "undefined") {
        throw new Error(
            "[Server Config] you are importing a nodejs-only module outside of nodejs",
        );
    }

    const buildMode = process.env.BUILD_MODE ?? "standalone";
    const isApp = !!process.env.BUILD_APP;
    const version = "v1.0";

    // 从环境变量中读取 Git 提交信息
    const commitDate = process.env.NEXT_PUBLIC_COMMIT_DATE ?? "unknown";
    const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH ?? "unknown";

    return {
        version,
        commitDate,
        commitHash,
        buildMode,
        isApp,
    };
};

export type BuildConfig = ReturnType<typeof getBuildConfig>;