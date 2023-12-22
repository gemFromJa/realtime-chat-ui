import { useState } from "react";

export default function AppState() {
    const [app, configApp] = useState<{
        language: String;
    }>({
        language: "en",
    });

    const setLanguage = (language: string) => {
        configApp((config) => ({ ...config, language }));
    };

    return {
        data: app,
        actions: { configApp, setLanguage },
    };
}
