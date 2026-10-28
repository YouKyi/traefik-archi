import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

// Le thème vit sur <html data-theme>, posé avant le rendu par index.html (choix
// mémorisé, sinon réglage système). Le bouton le bascule et mémorise le choix.
const root = document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const isDark = () => root.dataset.theme === 'dark';

export function ThemeToggle() {
  const { t } = useLanguage();
  const dark = useSyncExternalStore(subscribe, isDark);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // stockage indisponible (navigation privée) : le choix vaut pour la page
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t('themeToLight') : t('themeToDark')}
      title={dark ? t('themeToLight') : t('themeToDark')}
      className="yk-btn yk-btn--ghost yk-btn--icon yk-btn--sm"
    >
      <span className="yk-btn__icon">{dark ? <Sun /> : <Moon />}</span>
    </button>
  );
}
