import { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Globe, ChevronDown, Menu } from 'lucide-react';
import { UserRole } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

interface HeaderProps {
  role: UserRole;
  userName: string;
  onLogout: () => void;
  notificationCount?: number;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function Header({ role, userName, onLogout, notificationCount = 0, onMenuToggle, isMenuOpen = false }: HeaderProps) {
  const { t, language, setLanguage } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleTitle = () => {
    switch (role) {
      case 'buyer': return t('header.buyerPortal');
      case 'supplier': return t('header.supplierPortal');
      case 'admin': return t('header.adminConsole');
      default: return t('header.portal');
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <span className="text-[#CFAE70] font-bold text-lg sm:text-xl">DD</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent truncate">{getRoleTitle()}</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Dynamic Discounting Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{language === 'en' ? 'English' : 'العربية'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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

          <button className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110" title={t('header.notifications')}>
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center space-x-3 border-l border-gray-200 pl-3 lg:pl-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 sm:p-2.5 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
            title={t('header.logout')}
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-600" />
          </button>

          {/* Hamburger Menu Button - On the right side, only on mobile/tablet */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 ml-2 border-l border-gray-200 pl-2"
              aria-label="Toggle menu"
            >
              <Menu className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
