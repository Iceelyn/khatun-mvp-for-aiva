import { useT } from '../i18n/index.jsx'

// Compact MN | EN segmented toggle.
export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useT()
  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label={t('lang.aria')}>
      <button
        className={`lang-toggle__btn ${lang === 'mn' ? 'is-active' : ''}`}
        onClick={() => setLang('mn')}
        aria-pressed={lang === 'mn'}
      >
        {t('lang.mn')}
      </button>
      <span className="lang-toggle__sep" aria-hidden="true">
        /
      </span>
      <button
        className={`lang-toggle__btn ${lang === 'en' ? 'is-active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        {t('lang.en')}
      </button>
    </div>
  )
}
