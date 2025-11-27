import { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../Common/Button';

export function PublicHeader() {
  const { t, language, setLanguage } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[#CFAE70] font-bold text-lg sm:text-xl">DD</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">{t('app.name')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-[#006C35]' : 'text-gray-700 hover:text-[#006C35]'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-[#006C35]' : 'text-gray-700 hover:text-[#006C35]'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-[#006C35]' : 'text-gray-700 hover:text-[#006C35]'
              }`}
            >
              {t('nav.contact')}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{language === 'en' ? 'English' : 'العربية'}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg ${
                      language === 'en' ? 'bg-[#006C35] text-white hover:bg-[#004d26]' : 'text-gray-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ar');
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 last:rounded-b-lg ${
                      language === 'ar' ? 'bg-[#006C35] text-white hover:bg-[#004d26]' : 'text-gray-700'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            <Link to="/login">
              <Button variant="primary" size="sm">
                {t('nav.login')}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4 pb-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium ${
                isActive('/') ? 'text-[#006C35]' : 'text-gray-700'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium ${
                isActive('/about') ? 'text-[#006C35]' : 'text-gray-700'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium ${
                isActive('/contact') ? 'text-[#006C35]' : 'text-gray-700'
              }`}
            >
              {t('nav.contact')}
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                {t('nav.login')}
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

