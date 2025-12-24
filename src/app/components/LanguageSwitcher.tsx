import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const switchLanguage = () => {
        if (language === 'en') {
            navigate('/fr');
        } else {
            navigate('/');
        }
    };

    return (
        <button
            onClick={switchLanguage}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm border border-slate-600 rounded-lg text-white transition-all shadow-lg group"
            aria-label="Switch language"
        >
            <Globe className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            <span className="font-medium">{language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}</span>
        </button>
    );
}
