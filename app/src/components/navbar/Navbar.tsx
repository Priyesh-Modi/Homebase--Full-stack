import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { useTranslation } from "react-i18next";
import "./navbar.scss";

// Define types for the current user from context
interface User {
  avatar?: string;
  username: string;
}

function Navbar() {
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = useState<boolean>(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState<boolean>(false); // State for language dropdown

  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  // Fetch notifications if user is logged in
  if (currentUser) fetch();

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen((prev) => !prev);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Change language
    setLanguageMenuOpen(false); // Close the dropdown after selection
  };

  return (
      <nav>
        <div className="left">
          <a href="/" className="logo">
            <img src="/logo.png" alt="Logo" />
            <span>HomeBase</span>
          </a>

          <Link to="/">{t('Home')}</Link>
          <Link to="/about">{t('About')}</Link>
          <Link to="/contact">{t('Contact')}</Link>
        </div>
        <div className="right">
          {currentUser ? (
              <div className="user">
                <img src={currentUser.avatar || "/noavatar.jpg"} alt="User Avatar" />
                <span>{currentUser.username}</span>
                <Link to="/profile" className="profile">
                  {number > 0 && <div className="notification">{number}</div>}
                  <span>Profile</span>
                </Link>
              </div>
          ) : (
              <>
                <a href="/login">Sign in</a>
                <a href="/register" className="register">
                  Sign up
                </a>
              </>
          )}
          {/* Language Dropdown */}
          <div className="language-selector">
            <button onClick={toggleLanguageMenu} className="language-btn">
              {t('Language')}
            </button>
            {languageMenuOpen && (
                <div className="language-menu">
                  <a href="#" onClick={() => changeLanguage('en')}>
                    English
                  </a>
                  <a href="#" onClick={() => changeLanguage('hi')}>
                    हिंदी
                  </a>
                </div>
            )}
          </div>
          <div className="menuIcon">
            <img
                src="/menu.png"
                alt="Menu Icon"
                onClick={() => setOpen((prev) => !prev)}
            />
          </div>
          <div className={open ? "menu active" : "menu"}>
            <Link to="/homePage">{t('Home')}</Link>
            <Link to="/about">{t('About')}</Link>
            <Link to="/contact">{t('Contact')}</Link>

            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
