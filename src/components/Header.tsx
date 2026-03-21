import logo from '../assets/logo.png';  // adjust path if needed

export default function Header() {
    return (
      <header className="app-header">
        <img 
          src={logo} 
          className="app-logo"
        />
      </header>
  )
}
