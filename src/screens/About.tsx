import { Target, Award, Users, Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';
import { Button } from '../components/Common/Button';
import { Footer } from '../components/Layout/Footer';

export function About() {
  const { t } = useTranslation();

  const values = [
    { icon: <Target className="w-6 h-6" />, title: t('about.value1.title'), description: t('about.value1.description') },
    { icon: <Award className="w-6 h-6" />, title: t('about.value2.title'), description: t('about.value2.description') },
    { icon: <Users className="w-6 h-6" />, title: t('about.value3.title'), description: t('about.value3.description') },
    { icon: <Globe className="w-6 h-6" />, title: t('about.value4.title'), description: t('about.value4.description') },
  ];

  const milestones = [
    { year: '2020', title: t('about.milestone1.title'), description: t('about.milestone1.description') },
    { year: '2021', title: t('about.milestone2.title'), description: t('about.milestone2.description') },
    { year: '2022', title: t('about.milestone3.title'), description: t('about.milestone3.description') },
    { year: '2024', title: t('about.milestone4.title'), description: t('about.milestone4.description') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#006C35] to-[#004d26] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{t('about.hero.title')}</h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100">{t('about.hero.subtitle')}</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{t('about.mission.title')}</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">{t('about.mission.description1')}</p>
              <p className="text-base sm:text-lg text-gray-700">{t('about.mission.description2')}</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{t('about.vision.title')}</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">{t('about.vision.description1')}</p>
              <p className="text-base sm:text-lg text-gray-700">{t('about.vision.description2')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.values.title')}</h2>
            <p className="text-gray-600">{t('about.values.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.timeline.title')}</h2>
            <p className="text-gray-600">{t('about.timeline.subtitle')}</p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-3 sm:space-x-6">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                  {milestone.year}
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#006C35] to-[#004d26] py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('about.cta.title')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 px-4 sm:px-0">{t('about.cta.subtitle')}</p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              {t('about.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

