import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#003d1f] text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#006C35] font-bold text-xl">DD</span>
              </div>
              <span className="text-xl font-bold">{t('app.name')}</span>
            </div>
            <p className="text-green-100 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">{t('nav.login')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.service1')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.service2')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.service3')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.service4')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm text-green-100">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>info@dynamicdiscount.sa</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>+966 11 234 5678</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{t('contact.addressValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center text-sm text-green-200">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

