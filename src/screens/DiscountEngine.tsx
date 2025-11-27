import { useState } from 'react';
import { Calculator, TrendingDown, Info } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { useTranslation } from '../hooks/useTranslation';

export function DiscountEngine() {
  const { t } = useTranslation();
  const [invoiceAmount, setInvoiceAmount] = useState(100000);
  const [daysEarly, setDaysEarly] = useState(15);
  const [model, setModel] = useState<'linear' | 'exponential' | 'bracket'>('linear');

  const calculateDiscount = () => {
    let rate = 0;
    switch (model) {
      case 'linear':
        rate = (daysEarly / 30) * 2.5;
        break;
      case 'exponential':
        rate = Math.pow(daysEarly / 30, 1.2) * 3.0;
        break;
      case 'bracket':
        if (daysEarly <= 10) rate = 1.5;
        else if (daysEarly <= 20) rate = 2.5;
        else rate = 3.5;
        break;
    }
    return Math.min(rate, 5.0);
  };

  const discountRate = calculateDiscount();
  const discountAmount = (invoiceAmount * discountRate) / 100;
  const payoutAmount = invoiceAmount - discountAmount;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('discount.engine.title')}</h2>
        <p className="text-sm sm:text-base text-gray-600">{t('discount.engine.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="w-6 h-6 text-[#006C35]" />
              <h3 className="text-lg font-bold text-gray-900">{t('discount.engine.calculator')}</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('discount.engine.model')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setModel('linear')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      model === 'linear'
                        ? 'border-[#006C35] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900 mb-1">{t('discount.engine.linear')}</p>
                    <p className="text-xs text-gray-600">{t('discount.engine.linearDesc')}</p>
                  </button>
                  <button
                    onClick={() => setModel('exponential')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      model === 'exponential'
                        ? 'border-[#006C35] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900 mb-1">{t('discount.engine.exponential')}</p>
                    <p className="text-xs text-gray-600">{t('discount.engine.exponentialDesc')}</p>
                  </button>
                  <button
                    onClick={() => setModel('bracket')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      model === 'bracket'
                        ? 'border-[#006C35] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900 mb-1">{t('discount.engine.fixedBracket')}</p>
                    <p className="text-xs text-gray-600">{t('discount.engine.fixedBracketDesc')}</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('discount.engine.invoiceAmount')}
                </label>
                <input
                  type="number"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('discount.engine.daysBeforeDue')}: <span className="text-[#006C35] font-bold">{daysEarly} {t('discount.engine.days')}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={daysEarly}
                  onChange={(e) => setDaysEarly(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006C35]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 {t('discount.engine.days')}</span>
                  <span>30 {t('discount.engine.days')}</span>
                  <span>60 {t('discount.engine.days')}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#006C35] to-[#004d26] rounded-lg p-6 text-white">
                <h4 className="text-sm font-medium text-green-100 mb-4">{t('discount.engine.calculatedResults')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs text-green-200 mb-1">{t('supplier.dashboard.discountRate')}</p>
                    <p className="text-2xl font-bold text-[#CFAE70]">{discountRate.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-200 mb-1">{t('discount.engine.discountAmount')}</p>
                    <p className="text-2xl font-bold">SAR {discountAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-200 mb-1">{t('discount.engine.payoutAmount')}</p>
                    <p className="text-2xl font-bold">SAR {payoutAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('discount.engine.modelComparison')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('discount.engine.daysEarly')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('discount.engine.linear')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('discount.engine.exponential')}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('discount.engine.fixedBracket')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[5, 10, 15, 20, 25, 30].map((days) => {
                    const linear = (days / 30) * 2.5;
                    const exponential = Math.pow(days / 30, 1.2) * 3.0;
                    const bracket = days <= 10 ? 1.5 : days <= 20 ? 2.5 : 3.5;

                    return (
                      <tr key={days} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{days} {t('discount.engine.days')}</td>
                        <td className="py-3 px-4 text-gray-700">{linear.toFixed(2)}%</td>
                        <td className="py-3 px-4 text-gray-700">{exponential.toFixed(2)}%</td>
                        <td className="py-3 px-4 text-gray-700">{bracket.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-5 h-5 text-[#006C35]" />
              <h3 className="font-bold text-gray-900">{t('discount.engine.modelDescriptions')}</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">{t('discount.engine.linear')} {t('admin.config.model')}</p>
                <p className="text-sm text-blue-700">
                  {t('discount.engine.linearModelDesc')}
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">{t('discount.engine.exponential')} {t('admin.config.model')}</p>
                <p className="text-sm text-green-700">
                  {t('discount.engine.exponentialModelDesc')}
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="font-semibold text-orange-900 mb-2">{t('discount.engine.fixedBracket')} {t('admin.config.model')}</p>
                <p className="text-sm text-orange-700">
                  {t('discount.engine.fixedBracketModelDesc')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#006C35] to-[#004d26] text-white">
            <TrendingDown className="w-8 h-8 text-[#CFAE70] mb-3" />
            <h3 className="text-lg font-bold mb-2">{t('discount.engine.optimizationTips')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-[#CFAE70] rounded-full mt-2"></div>
                <p className="text-green-100">{t('discount.engine.tip1')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-[#CFAE70] rounded-full mt-2"></div>
                <p className="text-green-100">{t('discount.engine.tip2')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-[#CFAE70] rounded-full mt-2"></div>
                <p className="text-green-100">{t('discount.engine.tip3')}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">{t('discount.engine.quickStats')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('discount.engine.avgMarketRate')}</span>
                <span className="font-semibold text-gray-900">2.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('discount.engine.industryRange')}</span>
                <span className="font-semibold text-gray-900">2.0% - 3.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('discount.engine.yourAvgRate')}</span>
                <span className="font-semibold text-green-600">2.5%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
