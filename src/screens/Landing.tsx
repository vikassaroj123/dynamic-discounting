import { ArrowRight, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { useTranslation } from '../hooks/useTranslation';

interface LandingProps {
  onGetStarted: () => void;
}

export function Landing({ onGetStarted }: LandingProps) {
  const { t } = useTranslation();

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('landing.feature1.title'),
      description: t('landing.feature1.description'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('landing.feature2.title'),
      description: t('landing.feature2.description'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('landing.feature3.title'),
      description: t('landing.feature3.description'),
    },
  ];

  const benefits = [
    t('landing.benefit1'),
    t('landing.benefit2'),
    t('landing.benefit3'),
    t('landing.benefit4'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006C35] via-[#004d26] to-[#003d1f]">
      {/* Header */}
      <header className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[#006C35] font-bold text-lg sm:text-xl">DD</span>
          </div>
          <span className="text-white font-bold text-lg sm:text-xl truncate">{t('app.name')}</span>
        </div>
        <Button variant="secondary" onClick={onGetStarted} size="sm" className="text-xs sm:text-sm">
          <span className="hidden sm:inline">{t('landing.getStarted')}</span>
          <span className="sm:hidden">Start</span>
        </Button>
      </header>

      {/* Hero Section */}
      <div className="px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            {t('landing.hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 px-2 sm:px-0">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={onGetStarted} className="flex items-center justify-center">
              {t('landing.hero.cta')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20">
              {t('landing.hero.learnMore')}
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('landing.features.title')}</h2>
            <p className="text-sm sm:text-base text-gray-600">{t('landing.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-[#006C35] to-[#004d26] py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">{t('landing.benefits.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 text-left bg-white/10 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-[#CFAE70] flex-shrink-0 mt-1" />
                <p className="text-green-100">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('landing.cta.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{t('landing.cta.subtitle')}</p>
          <Button variant="primary" size="lg" onClick={onGetStarted} className="flex items-center mx-auto">
            {t('landing.cta.button')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003d1f] py-6 sm:py-8 px-4 sm:px-6 text-center">
        <p className="text-green-200 text-xs sm:text-sm">{t('landing.footer')}</p>
      </footer>
    </div>
  );
}

