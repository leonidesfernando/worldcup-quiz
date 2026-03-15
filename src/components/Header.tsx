import { useTranslation } from '../useTranslation';

export default function Header() {
  const { t } = useTranslation();  // ← get t() from context

  return (
    <header>
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
    </header>
  )
}