import { useState } from 'react';
import { TrendingDown, Calendar, Info } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { useTranslation } from '../hooks/useTranslation';

export function SupplierOffers() {
  const { t } = useTranslation();
  const [discountSlider, setDiscountSlider] = useState(2.8);
  const [showCounterOffer, setShowCounterOffer] = useState(false);

  const invoice = {
    invoiceNumber: 'INV-2024-018',
    buyer: 'SABIC',
    amount: 189000,
    dueDate: '2024-12-20',
    daysEarly: 15,
    buyerOfferedDiscount: 3.1,
  };

  const calculatePayout = (amount: number, discount: number) => {
    return amount - (amount * discount / 100);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('supplier.offers.title')}</h2>
        <p className="text-sm sm:text-base text-gray-600">{t('supplier.offers.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{invoice.invoiceNumber}</h3>
                <p className="text-gray-600">{t('supplier.offers.earlyPaymentOffer')} {invoice.buyer}</p>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {t('supplier.offers.newOffer')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('supplier.dashboard.invoiceAmount')}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">SAR {invoice.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('supplier.offers.originalDueDate')}</p>
                <p className="text-base sm:text-lg font-medium text-gray-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {invoice.dueDate}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('supplier.offers.earlyPayment')}</p>
                <p className="text-base sm:text-lg font-medium text-green-600">{invoice.daysEarly} {t('supplier.offers.daysEarly')}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t('supplier.offers.buyersOffer')}</h4>
                  <p className="text-sm text-gray-700">
                    {t('supplier.offers.buyerOffering').replace('{buyer}', invoice.buyer).replace('{days}', String(invoice.daysEarly)).replace('{discount}', String(invoice.buyerOfferedDiscount))}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">{t('supplier.offers.buyerDiscountRate')}</p>
                  <p className="text-2xl font-bold text-blue-600">{invoice.buyerOfferedDiscount}%</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">{t('supplier.offers.youWillReceive')}</p>
                  <p className="text-2xl font-bold text-green-600">
                    SAR {calculatePayout(invoice.amount, invoice.buyerOfferedDiscount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {!showCounterOffer ? (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 w-full sm:w-auto"
                  onClick={() => {
                    alert(t('supplier.offers.offerAccepted'));
                  }}
                >
                  {t('supplier.offers.acceptOffer')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 w-full sm:w-auto"
                  onClick={() => setShowCounterOffer(true)}
                >
                  {t('supplier.offers.submitCounterOffer')}
                </Button>
              </div>
            ) : (
              <div className="border-t pt-6">
                <h4 className="font-bold text-gray-900 mb-4">{t('supplier.offers.counterOfferTitle')}</h4>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">{t('supplier.offers.yourProposedRate')}</label>
                      <span className="text-lg font-bold text-[#006C35]">{discountSlider.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={discountSlider}
                      onChange={(e) => setDiscountSlider(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006C35]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>0.5%</span>
                      <span>3.0%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">{t('supplier.offers.yourCounterRate')}</p>
                      <p className="text-lg sm:text-xl font-bold text-[#006C35]">{discountSlider.toFixed(1)}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">{t('supplier.offers.youWillReceive')}</p>
                      <p className="text-lg sm:text-xl font-bold text-green-600">
                        SAR {calculatePayout(invoice.amount, discountSlider).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1 w-full sm:w-auto"
                      onClick={() => {
                        alert(t('supplier.offers.counterOfferSent').replace('{rate}', discountSlider.toFixed(1)));
                        setShowCounterOffer(false);
                      }}
                    >
                      {t('supplier.offers.sendCounterOffer')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setShowCounterOffer(false)}
                      className="w-full sm:w-auto"
                    >
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('supplier.offers.paymentBreakdown')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span className="text-gray-600">{t('supplier.offers.originalAmount')}</span>
                <span className="font-semibold text-gray-900">SAR {invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span className="text-gray-600">{t('buyer.invoices.discount')} ({invoice.buyerOfferedDiscount}%)</span>
                <span className="font-semibold text-orange-600">
                  - SAR {((invoice.amount * invoice.buyerOfferedDiscount) / 100).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span className="text-gray-600">{t('supplier.offers.earlyPaymentBonus')}</span>
                <span className="text-sm text-gray-500">{invoice.daysEarly} {t('supplier.offers.daysEarly')}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-lg font-bold text-gray-900">{t('supplier.offers.netPayment')}</span>
                <span className="text-lg font-bold text-green-600">
                  SAR {calculatePayout(invoice.amount, invoice.buyerOfferedDiscount).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#006C35] to-[#004d26] text-white">
            <TrendingDown className="w-8 h-8 text-[#CFAE70] mb-3" />
            <h3 className="text-lg font-bold mb-2">{t('supplier.offers.marketInsights')}</h3>
            <p className="text-sm text-green-100 mb-4">
              {t('supplier.offers.marketInsightsDesc')}
            </p>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-green-200 mb-1">{t('supplier.offers.industryAverage')}</p>
              <p className="text-xl font-bold">2.9%</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('supplier.offers.quickFacts')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-[#006C35] rounded-full mt-2"></div>
                <p className="text-gray-700">{t('supplier.offers.fact1')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-[#006C35] rounded-full mt-2"></div>
                <p className="text-gray-700">{t('supplier.offers.fact2')}</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-[#006C35] rounded-full mt-2"></div>
                <p className="text-gray-700">{t('supplier.offers.fact3')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
