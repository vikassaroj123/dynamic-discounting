import { useState } from 'react';
import { DollarSign, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { useTranslation } from '../hooks/useTranslation';

export function PaymentProcessing() {
  const { t } = useTranslation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [paymentBatches, setPaymentBatches] = useState([
    { id: 'BATCH-001', date: '2024-11-20', invoices: 8, amount: 456000, status: 'completed', processedBy: 'Ahmed Al-Zahrani' },
    { id: 'BATCH-002', date: '2024-11-20', invoices: 5, amount: 289000, status: 'processing', processedBy: 'Fatima Al-Qahtani' },
    { id: 'BATCH-003', date: '2024-11-19', invoices: 12, amount: 678000, status: 'completed', processedBy: 'Mohammed Al-Dosari' },
    { id: 'BATCH-004', date: '2024-11-19', invoices: 3, amount: 145000, status: 'failed', processedBy: 'Ahmed Al-Zahrani' },
  ]);

  const availableInvoices = [
    { id: 'INV-001', supplier: 'Al-Rashid Trading Co.', amount: 125000, dueDate: '2024-12-15' },
    { id: 'INV-002', supplier: 'Saudi Industrial Supplies', amount: 89000, dueDate: '2024-12-20' },
    { id: 'INV-003', supplier: 'Gulf Manufacturing Ltd.', amount: 210000, dueDate: '2024-12-10' },
    { id: 'INV-004', supplier: 'Modern Equipment Corp.', amount: 45000, dueDate: '2024-12-25' },
  ];

  const auditTrail = [
    { timestamp: '2024-11-20 14:35:22', action: 'Payment Initiated', user: 'Ahmed Al-Zahrani', batch: 'BATCH-002', details: '5 invoices, SAR 289,000' },
    { timestamp: '2024-11-20 14:32:18', action: 'Payment Completed', user: 'System', batch: 'BATCH-001', details: '8 invoices processed successfully' },
    { timestamp: '2024-11-20 14:28:45', action: 'Batch Approved', user: 'Fatima Al-Qahtani', batch: 'BATCH-001', details: 'Final approval granted' },
    { timestamp: '2024-11-20 14:15:33', action: 'Bank Verification', user: 'System', batch: 'BATCH-001', details: 'All IBANs verified' },
    { timestamp: '2024-11-20 13:58:12', action: 'Batch Created', user: 'Ahmed Al-Zahrani', batch: 'BATCH-001', details: '8 invoices added' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-2">{t('payment.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('payment.subtitle')}</p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsProcessModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <DollarSign className="w-4 h-4 mr-2" />
          {t('payment.processBatch')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('payment.todaysPayments')}</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">13</p>
          <p className="text-sm text-gray-500 mt-1">{t('payment.todaysPaymentsSubtitle')}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('common.processing')}</h3>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500 mt-1">{t('payment.processingSubtitle')}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('payment.successRate')}</h3>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">✓</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">98.7%</p>
          <p className="text-sm text-gray-500 mt-1">{t('payment.successRateSubtitle')}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Failed</h3>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500 mt-1">Requires review</p>
        </Card>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('payment.paymentBatches')}</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              alert('Payment report exported successfully! The report will be downloaded shortly.');
            }}
            className="w-full sm:w-auto"
          >
            {t('payment.exportReport')}
          </Button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('payment.batchId')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">{t('payment.date')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('payment.invoices')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('payment.totalAmount')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('common.status')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">{t('payment.processedBy')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.users.actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(batch.status)}
                        <span className="text-sm sm:text-base font-medium text-gray-900">{batch.id}</span>
                      </div>
                      <div className="text-xs text-gray-500 md:hidden mt-1">{batch.date}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{batch.date}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700">{batch.invoices}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base font-semibold text-gray-900">SAR {batch.amount.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700 hidden lg:table-cell">{batch.processedBy}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedBatch(batch);
                          setIsDetailsModalOpen(true);
                        }}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">{t('admin.erp.viewDetails')}</span>
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

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#006C35]" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Audit Trail</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              alert('Full audit log opened. Showing all payment processing activities.');
            }}
            className="w-full sm:w-auto"
          >
            {t('common.viewAll')}
          </Button>
        </div>

        <div className="space-y-3">
          {auditTrail.map((entry, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-2 h-2 bg-[#006C35] rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900">{entry.action}</span>
                  <span className="text-xs text-gray-500">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{entry.details}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{t('payment.batch')}: <span className="font-medium text-gray-700">{entry.batch}</span></span>
                  <span>•</span>
                  <span>{t('payment.user')}: <span className="font-medium text-gray-700">{entry.user}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#CFAE70]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('payment.paymentSuccessful')}</h3>
            <p className="text-gray-600 mb-6">
              {t('payment.paymentSuccessfulDesc')}
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">{t('payment.batchIdLabel')}</span>
                <span className="text-sm font-semibold text-gray-900">BATCH-002</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">{t('payment.invoicesProcessed')}</span>
                <span className="text-sm font-semibold text-gray-900">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('payment.totalAmountLabel')}</span>
                <span className="text-sm font-semibold text-green-600">SAR 289,000</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-green-700">
                {t('payment.confirmationEmails')}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setShowSuccessModal(false)}
            >
              {t('common.close')}
            </Button>
          </Card>
        </div>
      )}

      {/* Process New Batch Modal */}
      <Modal
        isOpen={isProcessModalOpen}
        onClose={() => {
          setIsProcessModalOpen(false);
          setSelectedInvoices([]);
        }}
        title={t('payment.processBatch')}
        size="xl"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('payment.selectInvoices')}</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableInvoices.map((invoice) => (
                <label
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoices([...selectedInvoices, invoice.id]);
                        } else {
                          setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                        }
                      }}
                      className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-sm text-gray-600">{invoice.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">SAR {invoice.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{t('payment.dueDate')}: {invoice.dueDate}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {selectedInvoices.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{t('payment.selectedInvoices')}:</span>
                <span className="text-sm font-bold text-[#006C35]">{selectedInvoices.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{t('payment.totalAmountLabel')}:</span>
                <span className="text-lg font-bold text-gray-900">
                  SAR {availableInvoices
                    .filter(inv => selectedInvoices.includes(inv.id))
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={selectedInvoices.length === 0}
              onClick={() => {
                const batchId = `BATCH-${String(Date.now()).slice(-3)}`;
                const totalAmount = availableInvoices
                  .filter(inv => selectedInvoices.includes(inv.id))
                  .reduce((sum, inv) => sum + inv.amount, 0);
                
                setPaymentBatches([{
                  id: batchId,
                  date: new Date().toISOString().split('T')[0],
                  invoices: selectedInvoices.length,
                  amount: totalAmount,
                  status: 'processing',
                  processedBy: 'Current User',
                }, ...paymentBatches]);
                
                setIsProcessModalOpen(false);
                setSelectedInvoices([]);
                setShowSuccessModal(true);
              }}
            >
              {t('payment.processBatchBtn')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setIsProcessModalOpen(false);
                setSelectedInvoices([]);
              }}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Batch Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedBatch(null);
        }}
        title={`${t('payment.batchDetails')}: ${selectedBatch?.id || ''}`}
        size="lg"
      >
        {selectedBatch && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('payment.batchId')}</p>
                <p className="font-semibold text-gray-900">{selectedBatch.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('payment.date')}</p>
                <p className="font-semibold text-gray-900">{selectedBatch.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('payment.invoices')}</p>
                <p className="font-semibold text-gray-900">{selectedBatch.invoices}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('payment.totalAmount')}</p>
                <p className="font-semibold text-green-600">SAR {selectedBatch.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('common.status')}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBatch.status)}`}>
                  {selectedBatch.status.charAt(0).toUpperCase() + selectedBatch.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('payment.processedBy')}</p>
                <p className="font-semibold text-gray-900">{selectedBatch.processedBy}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">{t('payment.invoiceList')}</h4>
              <div className="space-y-2">
                {Array.from({ length: selectedBatch.invoices }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">INV-2024-{String(i + 1).padStart(3, '0')}</span>
                    <span className="text-sm text-gray-600">SAR {(selectedBatch.amount / selectedBatch.invoices).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedBatch(null);
                }}
              >
                {t('common.close')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
