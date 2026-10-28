import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

const languages = [
    { code: 'fr', path: '/fr', label: 'Français' },
    { code: 'en', path: '/', label: 'English' },
] as const;

export function LanguageSwitcher() {
    const { language } = useLanguage();

    return (
        <nav className="yk-nav__items" aria-label={language === 'fr' ? 'Langue' : 'Language'}>
            {languages.map(({ code, path, label }) => (
                <Link
                    key={code}
                    to={path}
                    lang={code}
                    hrefLang={code}
                    aria-label={label}
                    aria-current={language === code ? 'page' : undefined}
                    className={`yk-nav__link${language === code ? ' yk-nav__link--active' : ''}`}
                >
                    {code.toUpperCase()}
                </Link>
            ))}
        </nav>
    );
}
