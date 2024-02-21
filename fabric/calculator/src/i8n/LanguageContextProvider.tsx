import { useState } from 'react';
import { LanguageContext } from './LanguageContext';

type LanguageProviderProps = {
    children: React.ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<string>('en');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};