import logo from '../assets/logo.png';  // adjust path if needed

export default function Header() {
    return (
      <header className="app-header">
        <img 
          src={logo} 
          alt="World Cup Quiz Logo" 
          className="app-logo"
        />
      </header>
  )
}
/*import { useTranslation } from '../useTranslation';
import logo from "./logo.png";

export default function Header() {
  const { t } = useTranslation();  // ← get t() from context

  return (
    <header>
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
        <img src={logo} />
    </header>
  )
}*/