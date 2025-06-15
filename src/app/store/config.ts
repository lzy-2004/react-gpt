import { persist } from "zustand/middleware";
import { LLMModel } from "../client/api";
import { getClientConfig } from "../config/client";
import {
    DEFAULT_INPUT_TEMPLATE,
    DEFAULT_MODELS,
    DEFAULT_SIDEBAR_WIDTH,
    StoreKey,
} from "../constant";
import { create } from "zustand";

export type ModelType = (typeof DEFAULT_MODELS)[number]["name"];

export enum SubmitKey {
    Enter = "Enter",
    CtrlEnter = "Ctrl + Enter",
    ShiftEnter = "Shift + Enter",
    AltEnter = "Alt + Enter",
    MetaEnter = "Meta + Enter",
}

export enum Theme {
    Auto = "auto",
    Dark = "dark",
    Light = "light",
}
interface AppConfigActions {
    updateTheme: (theme: Theme) => void;
    setConfig: (config: Partial<ChatConfig>) => void;
    // 其他 action 方法...
}
export const DEFAULT_CONFIG = {
    lastUpdate: Date.now(), // timestamp, to merge state

    submitKey: SubmitKey.Enter,
    avatar: "1f603",
    fontSize: 14,
    theme: Theme.Auto as Theme,
    tightBorder: !!getClientConfig()?.isApp,
    sendPreviewBubble: true,
    enableAutoGenerateTitle: true,
    sidebarWidth: DEFAULT_SIDEBAR_WIDTH,

    disablePromptHint: false,
    dontShowMaskSplashScreen: false, // dont show splash screen when create chat
    hideBuiltinMasks: false, // dont add builtin masks

    customModels: "",
    models: DEFAULT_MODELS as any as LLMModel[],

    modelConfig: {
        model: "gpt-3.5-turbo" as ModelType,
        temperature: 0.5,
        top_p: 1,
        max_tokens: 4000,
        presence_penalty: 0,
        frequency_penalty: 0,
        sendMemory: true,
        historyMessageCount: 4,
        compressMessageLengthThreshold: 1000,
        enableInjectSystemPrompts: true,
        template: DEFAULT_INPUT_TEMPLATE,
    },
};

export type ChatConfig = typeof DEFAULT_CONFIG;
export type ModelConfig = ChatConfig["modelConfig"];

export function limitNumber(x: number, min: number, max: number, defaultValue: number): number {
    if (isNaN(x)) return defaultValue;
    return Math.min(max, Math.max(min, x));
}

export const ModalConfigValidator = {
    model(x: string): ModelType {
        return x as ModelType;
    },
    max_tokens(x: number): number {
        return limitNumber(x, 0, 512000, 1024);
    },
    presence_penalty(x: number): number {
        return limitNumber(x, -2, 2, 0);
    },
    frequency_penalty(x: number): number {
        return limitNumber(x, -2, 2, 0);
    },
    temperature(x: number): number {
        return limitNumber(x, 0, 2, 1);
    },
    top_p(x: number): number {
        return limitNumber(x, 0, 1, 1);
    },
};

export const useAppConfig = create<ChatConfig & AppConfigActions>()(
    persist(
        (set, get) => ({
            ...DEFAULT_CONFIG,

            // 更新单个字段的方法
            // 在useAppConfig的定义中，替换原有的updateTheme实现
            updateTheme(theme: Theme) {
                set({ theme });
            },
            setConfig(config: Partial<ChatConfig>) { /* 原有实现 */ },
            updateSubmitKey(key: SubmitKey) {
                set({ submitKey: key });
            },
            updateFontSize(size: number) {
                set({ fontSize: size });
            },
            updateModelConfig(config: Partial<ModelConfig>) {
                set({
                    modelConfig: {
                        ...get().modelConfig,
                        ...config,
                    },
                });
            },

            reset() {
                set(() => ({ ...DEFAULT_CONFIG }));
            },

            mergeModels(newModels: LLMModel[]) {
                if (!newModels || newModels.length === 0) return;
                const oldModels = get().models;
                const modelMap: Record<string, LLMModel> = {};
                [...oldModels, ...newModels].forEach(model => {
                    modelMap[model.name] = { ...model };
                });
                set({ models: Object.values(modelMap) });
            },
        }),
        {
            name: StoreKey.Config,
        },
    ),
);