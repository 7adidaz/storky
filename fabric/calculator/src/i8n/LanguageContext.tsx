import { createContext } from "react";

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);
