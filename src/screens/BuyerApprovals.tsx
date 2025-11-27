import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { useTranslation } from '../hooks/useTranslation';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface Approval {
  id: string;
  type: string;
  invoiceNumber: string;
  supplier: string;
  amount: number;
  discount: number;
  requestedBy: string;
  date: string;
  status: ApprovalStatus;
}

export function BuyerApprovals() {
  const { t } = useTranslation();
  const [approvals, setApprovals] = useState<Approval[]>([
    {
      id: '1',
      type: t('buyer.approvals.discountOffer'),
      invoiceNumber: 'INV-2024-002',
      supplier: 'Saudi Industrial Supplies',
      amount: 89000,
      discount: 2.5,
      requestedBy: 'Ahmed Al-Zahrani',
      date: '2024-11-15',
      status: 'pending',
    },
    {
      id: '2',
      type: 'Early Payment',
      invoiceNumber: 'INV-2024-008',
      supplier: 'Gulf Manufacturing Ltd.',
      amount: 156000,
      discount: 3.2,
      requestedBy: 'Fatima Al-Qahtani',
      date: '2024-11-16',
      status: 'pending',
    },
    {
      id: '3',
      type: t('buyer.approvals.discountOffer'),
      invoiceNumber: 'INV-2024-012',
      supplier: 'Modern Equipment Corp.',
      amount: 45000,
      discount: 2.8,
      requestedBy: 'Mohammed Al-Dosari',
      date: '2024-11-14',
      status: 'approved',
    },
  ]);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('buyer.approvals.title')}</h2>
        <p className="text-sm sm:text-base text-gray-600">{t('buyer.approvals.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('buyer.approvals.pendingApprovals')}</h3>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">2</p>
          <p className="text-sm text-gray-500 mt-1">{t('buyer.approvals.requiresAction')}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('buyer.approvals.approvedToday')}</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500 mt-1">{t('buyer.approvals.totalValue')}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('buyer.approvals.rejected')}</h3>
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1</p>
          <p className="text-sm text-gray-500 mt-1">{t('buyer.approvals.thisWeek')}</p>
        </Card>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('buyer.approvals.approvalRequests')}</h3>
          <div className="flex space-x-2 w-full sm:w-auto">
            <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#006C35] focus:border-transparent w-full sm:w-auto">
              <option>{t('buyer.approvals.allRequests')}</option>
              <option>{t('buyer.approvals.pending')}</option>
              <option>{t('buyer.approvals.approved')}</option>
              <option>{t('buyer.approvals.rejectedStatus')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {approvals.map((approval) => (
            <Card key={approval.id} className="p-6 border-l-4 border-l-[#006C35]" hover>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-[#006C35] text-white rounded-full text-xs font-medium">
                      {approval.type === 'Discount Offer' ? t('buyer.approvals.discountOffer') : approval.type === 'Early Payment' ? t('buyer.approvals.earlyPayment') : approval.type}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{approval.invoiceNumber}</span>
                    {approval.status === 'pending' && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        {t('buyer.approvals.pendingReview')}
                      </span>
                    )}
                    {approval.status === 'approved' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {t('buyer.approvals.approved')}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t('buyer.approvals.supplier')}</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{approval.supplier}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t('buyer.invoices.invoiceAmount')}</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">SAR {approval.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t('supplier.dashboard.discountRate')}</p>
                      <p className="text-xs sm:text-sm font-medium text-green-600">{approval.discount}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t('buyer.approvals.savings')}</p>
                      <p className="text-xs sm:text-sm font-medium text-green-600">
                        SAR {((approval.amount * approval.discount) / 100).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{t('buyer.approvals.requestedBy')}: <span className="font-medium text-gray-900">{approval.requestedBy}</span></span>
                    <span>•</span>
                    <span>{approval.date}</span>
                  </div>
                </div>

                {approval.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:ml-4 mt-4 sm:mt-0 w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setApprovals(approvals.map(a =>
                          a.id === approval.id ? { ...a, status: 'approved' } : a
                        ));
                        alert(t('buyer.approvals.approvedSuccess').replace('{invoice}', approval.invoiceNumber));
                      }}
                      className="w-full sm:w-auto"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {t('buyer.approvals.approve')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setApprovals(approvals.map(a =>
                          a.id === approval.id ? { ...a, status: 'rejected' } : a
                        ));
                        alert(t('buyer.approvals.rejectedSuccess').replace('{invoice}', approval.invoiceNumber));
                      }}
                      className="w-full sm:w-auto"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      {t('buyer.approvals.reject')}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#006C35] to-[#004d26] text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#CFAE70]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold mb-1">{t('buyer.approvals.quickApproval')}</h3>
            <p className="text-xs sm:text-sm text-green-100">
              {t('buyer.approvals.quickApprovalDesc')}
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="md"
            onClick={() => {
              alert('Quick Approval Settings opened.\n\nConfigure auto-approval rules:\n- Discount threshold\n- Amount limits\n- Supplier whitelist\n- Approval workflow');
            }}
            className="w-full sm:w-auto"
          >
            {t('buyer.approvals.configure')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
