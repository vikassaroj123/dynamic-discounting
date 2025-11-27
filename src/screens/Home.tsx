import { ArrowRight, CheckCircle, Shield, Zap, Users, BarChart3, Globe, Brain, Sparkles, TrendingUp, Bot } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { Footer } from '../components/Layout/Footer';
import { Card } from '../components/Common/Card';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

export function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('home.feature1.title'),
      description: t('home.feature1.description'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('home.feature2.title'),
      description: t('home.feature2.description'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('home.feature3.title'),
      description: t('home.feature3.description'),
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('home.feature4.title'),
      description: t('home.feature4.description'),
    },
  ];

  const stats = [
    { value: '500+', label: t('home.stat1') },
    { value: 'SAR 2.5B+', label: t('home.stat2') },
    { value: '98.7%', label: t('home.stat3') },
    { value: '24/7', label: t('home.stat4') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#006C35] via-[#004d26] to-[#003d1f] text-white py-24">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#CFAE70]" />
              <span className="text-sm font-medium">{t('home.aiPlatform')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              {t('home.hero.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              {t('home.intelligentSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="secondary" size="lg" className="flex items-center shadow-2xl">
                  {t('home.hero.getStarted')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-sm">
                  {t('home.watchDemo')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Highlight */}
      <div className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-6 text-center hover border-2 border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('home.aiFeatures.title')}</h3>
              <p className="text-gray-600">{t('home.aiFeatures.description')}</p>
            </Card>
            <Card className="p-6 text-center hover border-2 border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('home.aiFeatures.predictive')}</h3>
              <p className="text-gray-600">{t('home.aiFeatures.predictiveDesc')}</p>
            </Card>
            <Card className="p-6 text-center hover border-2 border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('home.aiFeatures.assistant')}</h3>
              <p className="text-gray-600">{t('home.aiFeatures.assistantDesc')}</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-[#006C35] via-[#004d26] to-[#003d1f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 12c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23 11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  {index === 0 && <Users className="w-8 h-8 sm:w-10 sm:h-10" />}
                  {index === 1 && <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10" />}
                  {index === 2 && <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />}
                  {index === 3 && <Bot className="w-8 h-8 sm:w-10 sm:h-10" />}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-green-100 text-sm sm:text-base md:text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('home.features.title')}</h2>
            <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">{t('home.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
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
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{t('home.benefits.title')}</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#006C35] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t(`home.benefit${i}.title`)}</h3>
                      <p className="text-gray-600">{t(`home.benefit${i}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-2xl p-8 text-white">
              <Users className="w-16 h-16 text-[#CFAE70] mb-6" />
              <h3 className="text-2xl font-bold mb-4">{t('home.cta.title')}</h3>
              <p className="text-green-100 mb-6">{t('home.cta.subtitle')}</p>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="w-full">
                  {t('home.cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#006C35] to-[#004d26] py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('home.finalCta.title')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 px-4 sm:px-0">{t('home.finalCta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="secondary" size="lg">
                {t('home.finalCta.button1')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20">
                {t('home.finalCta.button2')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

