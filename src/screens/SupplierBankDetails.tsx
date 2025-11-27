import { Building2, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { useTranslation } from '../hooks/useTranslation';

export function SupplierBankDetails() {
  const { t } = useTranslation();
  const bankAccount = {
    bankName: 'Al Rajhi Bank',
    accountName: 'Al-Rashid Trading Co.',
    iban: 'SA03 8000 0000 6080 1016 7519',
    swiftCode: 'RJHISARI',
    status: 'verified',
    verifiedDate: '2024-10-15',
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('supplier.bank.title')}</h2>
        <p className="text-sm sm:text-base text-gray-600">{t('supplier.bank.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t('supplier.bank.primaryAccount')}</h3>
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{t('supplier.bank.verified')}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('supplier.bank.bankName')}</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Building2 className="w-5 h-5 text-[#006C35]" />
                    <span className="font-medium text-gray-900">{bankAccount.bankName}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('supplier.bank.accountName')}</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-medium text-gray-900">{bankAccount.accountName}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('supplier.bank.iban')}</label>
                <div className="p-4 bg-gradient-to-r from-[#006C35] to-[#004d26] rounded-lg">
                  <span className="font-mono text-lg font-bold text-white tracking-wider">
                    {bankAccount.iban}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('supplier.bank.swiftCode')}</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-mono font-medium text-gray-900">{bankAccount.swiftCode}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">{t('supplier.bank.accountVerified')}</p>
                  <p className="text-sm text-green-700">
                    {t('supplier.bank.verifiedDesc').replace('{date}', bankAccount.verifiedDate)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('supplier.bank.updateDetails')}</h3>
            <p className="text-sm text-gray-600 mb-6">
              {t('supplier.bank.updateDesc')}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3 mb-6">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900 mb-1">{t('supplier.bank.importantNotice')}</p>
                <p className="text-sm text-yellow-700">
                  {t('supplier.bank.noticeDesc')}
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="md"
              onClick={() => {
                alert(t('supplier.bank.updateRequested'));
              }}
            >
              {t('supplier.bank.requestUpdate')}
            </Button>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('supplier.bank.paymentHistory')}</h3>
            <div className="space-y-3">
              {[
                { date: '2024-11-18', invoice: 'INV-2024-012', amount: 122000, status: 'completed' },
                { date: '2024-11-13', invoice: 'INV-2024-009', amount: 89000, status: 'completed' },
                { date: '2024-11-08', invoice: 'INV-2024-005', amount: 156000, status: 'completed' },
                { date: '2024-11-05', invoice: 'INV-2024-002', amount: 210000, status: 'completed' },
              ].map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{payment.invoice}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">SAR {payment.amount.toLocaleString()}</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {payment.status === 'completed' ? t('common.completed') : payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#006C35] to-[#004d26] text-white">
            <Shield className="w-10 h-10 text-[#CFAE70] mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('supplier.bank.securePayments')}</h3>
            <p className="text-sm text-green-100 mb-4">
              {t('supplier.bank.secureDesc')}
            </p>
            <div className="bg-white/10 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#CFAE70]" />
                <span className="text-sm">{t('supplier.bank.sslEncryption')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#CFAE70]" />
                <span className="text-sm">{t('supplier.bank.samaCompliant')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#CFAE70]" />
                <span className="text-sm">{t('supplier.bank.realTimeVerification')}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('supplier.bank.paymentStats')}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{t('supplier.bank.totalReceived')}</span>
                  <span className="font-bold text-gray-900">SAR 1.8M</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{t('supplier.bank.thisMonth')}</span>
                  <span className="font-bold text-green-600">SAR 367K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('supplier.bank.avgProcessingTime')}</span>
                  <span className="font-bold text-gray-900">18 {t('supplier.bank.hours')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('supplier.bank.needHelp')}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('supplier.bank.helpDesc')}
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">{t('supplier.bank.email')}:</span> support@dynamicdiscount.sa
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{t('supplier.bank.phone')}:</span> +966 11 234 5678
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{t('supplier.bank.hoursLabel')}:</span> Sun-Thu, 9AM-5PM
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
