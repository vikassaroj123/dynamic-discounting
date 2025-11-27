import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Globe } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { UserRole } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRoleSelect, setShowRoleSelect] = useState(true); // Show role selection first
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
      navigate('/dashboard');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleSelect(false);
  };

  if (showRoleSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#006C35] via-[#004d26] to-[#003d1f] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(207, 174, 112, 0.3) 40px, rgba(207, 174, 112, 0.3) 80px)' }}></div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <span className="text-[#CFAE70] font-bold text-2xl sm:text-3xl">DD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('login.selectRole')}</h2>
            <p className="text-sm sm:text-base text-gray-600">{t('login.chooseRole')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <button
              onClick={() => handleRoleSelect('buyer')}
              className="group p-8 border-2 border-gray-200 rounded-xl hover:border-[#006C35] hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-[#006C35] transition-colors">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('login.buyerPortal')}</h3>
              <p className="text-sm text-gray-600">{t('login.buyerDesc')}</p>
            </button>

            <button
              onClick={() => handleRoleSelect('supplier')}
              className="group p-8 border-2 border-gray-200 rounded-xl hover:border-[#006C35] hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-[#006C35] transition-colors">
                <svg className="w-8 h-8 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('login.supplierPortal')}</h3>
              <p className="text-sm text-gray-600">{t('login.supplierDesc')}</p>
            </button>

            <button
              onClick={() => handleRoleSelect('admin')}
              className="group p-8 border-2 border-gray-200 rounded-xl hover:border-[#006C35] hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-[#006C35] transition-colors">
                <svg className="w-8 h-8 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('login.adminConsole')}</h3>
              <p className="text-sm text-gray-600">{t('login.adminDesc')}</p>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Select your role to continue to login</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006C35] via-[#004d26] to-[#003d1f] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(207, 174, 112, 0.3) 40px, rgba(207, 174, 112, 0.3) 80px)' }}></div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row relative z-10">
        <div className="flex-1 p-6 sm:p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-xl mb-4 sm:mb-6 flex items-center justify-center">
              <span className="text-[#CFAE70] font-bold text-2xl sm:text-3xl">DD</span>
            </div>

            <div className="mb-4 sm:mb-6">
              {selectedRole && (
                <div className="mb-3 sm:mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-700">
                    Selected: <span className="font-bold capitalize">{selectedRole} Portal</span>
                  </p>
                </div>
              )}
              <button
                onClick={() => setShowRoleSelect(true)}
                className="text-xs sm:text-sm text-[#006C35] hover:text-[#004d26] font-medium mb-3 sm:mb-4"
              >
                ← {t('login.changeRole')}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('login.welcomeBack')}</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{t('login.signIn')}</p>

            {!selectedRole && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-700">
                  {t('login.selectRoleFirst')}
                </p>
              </div>
            )}

            {selectedRole && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  {t('login.selectedRole')}: <span className="font-bold capitalize">{selectedRole} Portal</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]" />
                  <span className="ml-2 text-sm text-gray-600">{t('login.rememberMe')}</span>
                </label>
                <a href="#" className="text-sm text-[#006C35] hover:text-[#004d26] font-medium">
                  {t('login.forgotPassword')}
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!selectedRole}
              >
                {t('login.signInButton')}
              </Button>

              <div className="text-center">
                <button type="button" className="text-sm text-gray-600 hover:text-gray-900">
                  {t('login.otpMfa')} →
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:block w-full lg:w-1/2 bg-gradient-to-br from-[#006C35] to-[#004d26] p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(207, 174, 112, 0.5) 40px, rgba(207, 174, 112, 0.5) 80px)' }}></div>

          <div className="relative z-10 h-full flex flex-col justify-center">
            <Globe className="w-12 h-12 lg:w-16 lg:h-16 text-[#CFAE70] mb-4 lg:mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Dynamic Discounting</h2>
            <p className="text-base lg:text-lg text-green-100 mb-6 lg:mb-8">
              Optimize your supply chain with intelligent early payment solutions
            </p>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#CFAE70] rounded-full mt-2"></div>
                <p className="text-sm lg:text-base text-green-100">Real-time discount calculations</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#CFAE70] rounded-full mt-2"></div>
                <p className="text-sm lg:text-base text-green-100">Seamless ERP integration</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#CFAE70] rounded-full mt-2"></div>
                <p className="text-sm lg:text-base text-green-100">Enterprise-grade security</p>
              </div>
            </div>

            <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-green-700">
              <div className="flex items-center space-x-2">
                <span className="text-xs lg:text-sm text-green-200">Language:</span>
                <button className="text-xs lg:text-sm font-medium text-white hover:text-[#CFAE70] transition-colors">
                  English
                </button>
                <span className="text-green-300">|</span>
                <button className="text-xs lg:text-sm font-medium text-green-200 hover:text-[#CFAE70] transition-colors">
                  العربية
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
