import { useState } from 'react';
import { Search, Filter, Calendar, TrendingDown } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { Invoice } from '../types';
import { useTranslation } from '../hooks/useTranslation';

export function BuyerInvoices() {
  const { t } = useTranslation();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [discountSlider, setDiscountSlider] = useState(2);

  const invoices: Invoice[] = [
    { id: '1', invoiceNumber: 'INV-2024-001', amount: 125000, dueDate: '2024-12-15', uploadDate: '2024-11-01', status: 'pending', supplierName: 'Al-Rashid Trading Co.' },
    { id: '2', invoiceNumber: 'INV-2024-002', amount: 89000, dueDate: '2024-12-20', uploadDate: '2024-11-05', status: 'offered', supplierName: 'Saudi Industrial Supplies', discountRate: 2.5, daysEarly: 15 },
    { id: '3', invoiceNumber: 'INV-2024-003', amount: 210000, dueDate: '2024-12-10', uploadDate: '2024-10-28', status: 'approved', supplierName: 'Gulf Manufacturing Ltd.', discountRate: 3.2, daysEarly: 20 },
    { id: '4', invoiceNumber: 'INV-2024-004', amount: 45000, dueDate: '2024-12-25', uploadDate: '2024-11-08', status: 'pending', supplierName: 'Modern Equipment Corp.' },
    { id: '5', invoiceNumber: 'INV-2024-005', amount: 156000, dueDate: '2024-12-18', uploadDate: '2024-11-02', status: 'paid', supplierName: 'Al-Rashid Trading Co.', discountRate: 2.8, daysEarly: 18 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'offered': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'paid': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateDiscount = (amount: number, rate: number) => {
    return (amount * rate) / 100;
  };

  const calculatePayoutAmount = (amount: number, rate: number) => {
    return amount - calculateDiscount(amount, rate);
  };

  if (selectedInvoice) {
    const discountAmount = calculateDiscount(selectedInvoice.amount, discountSlider);
    const payoutAmount = calculatePayoutAmount(selectedInvoice.amount, discountSlider);

    return (
      <div className="p-4 sm:p-6">
        <button
          onClick={() => setSelectedInvoice(null)}
          className="text-[#006C35] hover:text-[#004d26] font-medium mb-4 sm:mb-6 text-sm sm:text-base"
        >
          {t('buyer.invoices.backToInvoices')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedInvoice.invoiceNumber}</h2>
                  <p className="text-gray-600">{selectedInvoice.supplierName}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status === 'pending' ? t('buyer.invoices.pending') : selectedInvoice.status === 'offered' ? t('buyer.invoices.offered') : selectedInvoice.status === 'approved' ? t('buyer.invoices.approved') : selectedInvoice.status === 'paid' ? t('buyer.invoices.paid') : selectedInvoice.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('buyer.invoices.invoiceAmount')}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">SAR {selectedInvoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('buyer.invoices.dueDate')}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('buyer.invoices.uploadDate')}</p>
                  <p className="text-base sm:text-lg text-gray-700">{selectedInvoice.uploadDate}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('buyer.invoices.daysUntilDue')}</p>
                  <p className="text-base sm:text-lg text-gray-700">18 {t('buyer.invoices.days')}</p>
                </div>
              </div>

              <div className="border-t pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('buyer.invoices.setDiscountOffer')}</h3>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">{t('buyer.invoices.discountRate')}</label>
                      <span className="text-lg font-bold text-[#006C35]">{discountSlider.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={discountSlider}
                      onChange={(e) => setDiscountSlider(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006C35]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>0.5%</span>
                      <span>5.0%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">{t('buyer.invoices.daysEarlyPayment')}</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">18 {t('buyer.invoices.days')}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">{t('buyer.invoices.yourSavings')}</p>
                      <p className="text-lg sm:text-xl font-bold text-green-600">SAR {discountAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      alert(t('buyer.invoices.offerSent'));
                      setSelectedInvoice(null);
                    }}
                  >
                    {t('buyer.invoices.sendOffer')}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('buyer.invoices.paymentSummary')}</h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">{t('buyer.invoices.invoiceAmount')}</span>
                  <span className="font-semibold text-gray-900">SAR {selectedInvoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">{t('buyer.invoices.discount')} ({discountSlider.toFixed(1)}%)</span>
                  <span className="font-semibold text-green-600">- SAR {discountAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-lg font-bold text-gray-900">{t('buyer.invoices.payoutToSupplier')}</span>
                  <span className="text-lg font-bold text-[#006C35]">SAR {payoutAmount.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-br from-[#006C35] to-[#004d26] text-white">
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-[#CFAE70] mb-3" />
              <h3 className="text-base sm:text-lg font-bold mb-2">{t('buyer.invoices.discountOptimization')}</h3>
              <p className="text-xs sm:text-sm text-green-100 mb-4">
                {t('buyer.invoices.optimizationDesc')}
              </p>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs text-green-200 mb-1">{t('buyer.invoices.recommendedRate')}</p>
                <p className="text-lg sm:text-xl font-bold">2.5% - 3.0%</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('buyer.invoices.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('buyer.invoices.subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:space-x-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="md"
            onClick={() => {
              alert('Filter options opened.\n\nFilter by:\n- Status\n- Date range\n- Supplier\n- Amount range');
            }}
          >
            <Filter className="w-4 h-4 mr-2" />
            {t('buyer.invoices.filter')}
          </Button>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => {
              alert('Invoice report exported successfully!\n\nThe report includes all invoice details, status, and discount information.');
            }}
          >
            {t('buyer.invoices.exportReport')}
          </Button>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder={t('buyer.invoices.searchPlaceholder')}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
            />
          </div>
          <select className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent w-full sm:w-auto">
            <option>{t('buyer.invoices.allStatus')}</option>
            <option>{t('buyer.invoices.pending')}</option>
            <option>{t('buyer.invoices.offered')}</option>
            <option>{t('buyer.invoices.approved')}</option>
            <option>{t('buyer.invoices.paid')}</option>
          </select>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('buyer.invoices.invoiceNumber')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">{t('buyer.invoices.supplier')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('buyer.invoices.amount')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">{t('buyer.invoices.dueDate')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('buyer.invoices.status')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">{t('buyer.invoices.discount')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('buyer.invoices.action')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                      <div className="text-xs text-gray-500 sm:hidden">{invoice.supplierName}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">{invoice.supplierName}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base font-semibold text-gray-900">SAR {invoice.amount.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{invoice.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status === 'pending' ? t('buyer.invoices.pending') : invoice.status === 'offered' ? t('buyer.invoices.offered') : invoice.status === 'approved' ? t('buyer.invoices.approved') : invoice.status === 'paid' ? t('buyer.invoices.paid') : invoice.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                      {invoice.discountRate ? (
                        <span className="text-green-600 font-semibold">{invoice.discountRate}%</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">{t('buyer.invoices.viewDetails')}</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
