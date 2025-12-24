import { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, Language, TranslationKeys } from './translations';

interface LanguageContextType {
    language: Language;
    t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const location = useLocation();

    // Determine language from URL path
    const language: Language = location.pathname.startsWith('/fr') ? 'fr' : 'en';

    const t = (key: TranslationKeys): string => {
        return translations[language][key];
    };

    return (
        <LanguageContext.Provider value={{ language, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
