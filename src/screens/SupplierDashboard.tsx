import { useState } from 'react';
import { DollarSign, FileText, TrendingUp, Clock, Brain } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KPICard, Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { AIInsightCard } from '../components/AI/AIInsightCard';
import { AIChatBot } from '../components/AI/AIChatBot';
import { useTranslation } from '../hooks/useTranslation';

export function SupplierDashboard() {
  const { t } = useTranslation();
  const [recentOffers, setRecentOffers] = useState([
    { id: '1', invoiceNumber: 'INV-2024-015', buyer: 'Saudi Aramco', amount: 245000, discount: 2.8, status: 'pending' },
    { id: '2', invoiceNumber: 'INV-2024-018', buyer: 'SABIC', amount: 189000, discount: 3.1, status: 'counter-offer' },
    { id: '3', invoiceNumber: 'INV-2024-021', buyer: 'Saudi Electricity', amount: 98000, discount: 2.5, status: 'accepted' },
  ]);
  const [showAllOffers, setShowAllOffers] = useState(false);

  // Monthly cash flow data
  const cashFlowData = [
    { month: 'Jan', received: 320000, pending: 180000 },
    { month: 'Feb', received: 380000, pending: 210000 },
    { month: 'Mar', received: 420000, pending: 195000 },
    { month: 'Apr', received: 450000, pending: 240000 },
    { month: 'May', received: 510000, pending: 280000 },
    { month: 'Jun', received: 580000, pending: 320000 },
  ];

  // Discount rate trends
  const discountTrendData = [
    { month: 'Jan', avgRate: 2.1, bestRate: 1.8, highestRate: 3.2 },
    { month: 'Feb', avgRate: 2.3, bestRate: 2.0, highestRate: 3.4 },
    { month: 'Mar', avgRate: 2.5, bestRate: 2.1, highestRate: 3.5 },
    { month: 'Apr', avgRate: 2.6, bestRate: 2.2, highestRate: 3.6 },
    { month: 'May', avgRate: 2.7, bestRate: 2.3, highestRate: 3.7 },
    { month: 'Jun', avgRate: 2.7, bestRate: 2.1, highestRate: 3.5 },
  ];

  // Offer status distribution
  const offerStatusData = [
    { status: 'Accepted', count: 45, value: 2100000 },
    { status: 'Pending', count: 12, value: 580000 },
    { status: 'Counter', count: 8, value: 320000 },
    { status: 'Rejected', count: 5, value: 180000 },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-2">{t('supplier.dashboard.title')}</h2>
        <p className="text-sm sm:text-base text-gray-600">{t('supplier.dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard
          title={t('supplier.dashboard.eligibleInvoices')}
          value="12"
          subtitle={t('supplier.dashboard.worth')}
          icon={<FileText className="w-6 h-6 text-[#CFAE70]" />}
        />
        <KPICard
          title={t('supplier.dashboard.cashAvailable')}
          value="SAR 456K"
          subtitle={t('supplier.dashboard.fromOffers')}
          icon={<DollarSign className="w-6 h-6 text-[#CFAE70]" />}
          trend={{ value: '18%', isPositive: true }}
        />
        <KPICard
          title={t('supplier.dashboard.avgDiscount')}
          value="2.7%"
          subtitle={t('supplier.dashboard.last30Days')}
          icon={<TrendingUp className="w-6 h-6 text-[#CFAE70]" />}
        />
        <KPICard
          title={t('supplier.dashboard.pendingOffers')}
          value="3"
          subtitle={t('supplier.dashboard.awaitingResponse')}
          icon={<Clock className="w-6 h-6 text-[#CFAE70]" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t('supplier.dashboard.recentOffers')}</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllOffers(!showAllOffers)}
              >
                {showAllOffers ? t('common.showLess') : t('common.viewAll')} →
              </Button>
            </div>

            <div className="space-y-4">
              {(showAllOffers ? recentOffers : recentOffers.slice(0, 3)).map((offer) => (
                <Card key={offer.id} className="p-4 border-l-4 border-l-[#006C35]" hover>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-gray-900">{offer.invoiceNumber}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          offer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          offer.status === 'counter-offer' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {offer.status === 'counter-offer' ? t('supplier.dashboard.counterOffer') : offer.status === 'pending' ? t('common.pending') : offer.status === 'accepted' ? t('common.accepted') : offer.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{t('supplier.dashboard.buyer')}: {offer.buyer}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                          <p className="text-xs text-gray-600">{t('supplier.dashboard.invoiceAmount')}</p>
                          <p className="text-sm font-semibold text-gray-900">SAR {offer.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">{t('supplier.dashboard.discountRate')}</p>
                          <p className="text-sm font-semibold text-orange-600">{offer.discount}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">{t('supplier.dashboard.youReceive')}</p>
                          <p className="text-sm font-semibold text-green-600">
                            SAR {(offer.amount - (offer.amount * offer.discount / 100)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {offer.status === 'pending' && (
                        <>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => {
                              setRecentOffers(recentOffers.map(o => 
                                o.id === offer.id ? { ...o, status: 'accepted' as const } : o
                              ));
                            }}
                          >
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setRecentOffers(recentOffers.map(o => 
                                o.id === offer.id ? { ...o, status: 'counter-offer' as const } : o
                              ));
                            }}
                          >
                            Counter
                          </Button>
                        </>
                      )}
                      {offer.status === 'counter-offer' && (
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => {
                            setRecentOffers(recentOffers.map(o => 
                              o.id === offer.id ? { ...o, status: 'accepted' as const } : o
                            ));
                          }}
                        >
                          Review
                        </Button>
                      )}
                      {offer.status === 'accepted' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          Accepted
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#006C35] to-[#004d26] text-white">
            <DollarSign className="w-10 h-10 text-[#CFAE70] mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('supplier.dashboard.quickCash')}</h3>
            <p className="text-sm text-green-100 mb-4">
              Accept pending offers to receive immediate payment
            </p>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-xs text-green-200 mb-1">Available Now</p>
              <p className="text-2xl font-bold">SAR 456,000</p>
            </div>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => setShowAllOffers(true)}
            >
              {t('supplier.dashboard.viewOffers')}
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('supplier.dashboard.paymentHistory')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">INV-2024-012</p>
                  <p className="text-xs text-gray-600">Saudi Aramco</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">SAR 122K</p>
                  <p className="text-xs text-gray-600">2 days ago</p>
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">INV-2024-009</p>
                  <p className="text-xs text-gray-600">SABIC</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">SAR 89K</p>
                  <p className="text-xs text-gray-600">5 days ago</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">INV-2024-005</p>
                  <p className="text-xs text-gray-600">Saudi Electricity</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">SAR 156K</p>
                  <p className="text-xs text-gray-600">1 week ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('supplier.dashboard.monthlyCashFlow')}</h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006C35" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#006C35" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CFAE70" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#CFAE70" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number) => `SAR ${(value / 1000).toFixed(0)}K`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="received"
                stroke="#006C35"
                fillOpacity={1}
                fill="url(#colorReceived)"
                name={t('supplier.dashboard.chartCashReceived')}
              />
              <Area
                type="monotone"
                dataKey="pending"
                stroke="#CFAE70"
                fillOpacity={1}
                fill="url(#colorPending)"
                name={t('supplier.dashboard.chartPending')}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('supplier.dashboard.discountTrends')}</h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <LineChart data={discountTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgRate"
                stroke="#006C35"
                strokeWidth={2}
                dot={{ fill: '#006C35', r: 4 }}
                name={t('supplier.dashboard.chartAverageRate')}
              />
              <Line
                type="monotone"
                dataKey="bestRate"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 4 }}
                name={t('supplier.dashboard.chartBestRate')}
              />
              <Line
                type="monotone"
                dataKey="highestRate"
                stroke="#F97316"
                strokeWidth={2}
                dot={{ fill: '#F97316', r: 4 }}
                name={t('supplier.dashboard.chartHighestRate')}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('supplier.dashboard.offerStatus')}</h3>
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <BarChart data={offerStatusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="status" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
              formatter={(value: number, name: string) => {
                if (name === 'value') return [`SAR ${(value / 1000).toFixed(0)}K`, 'Amount'];
                return [value, 'Count'];
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#006C35" name={t('supplier.dashboard.chartNumberOffers')} />
            <Bar dataKey="value" fill="#CFAE70" name={t('supplier.dashboard.chartTotalValue')} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('supplier.dashboard.discountAnalysis')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">{t('supplier.dashboard.bestRate')}</p>
            <p className="text-2xl font-bold text-green-600">2.1%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">{t('supplier.dashboard.averageRate')}</p>
            <p className="text-2xl font-bold text-gray-900">2.7%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">{t('supplier.dashboard.highestRate')}</p>
            <p className="text-2xl font-bold text-orange-600">3.5%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">{t('supplier.dashboard.totalSaved')}</p>
            <p className="text-2xl font-bold text-gray-900">SAR 42K</p>
          </div>
        </div>
      </Card>

      {/* AI Insights Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{t('ai.insights.title')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AIInsightCard
            type="recommendation"
            title={t('ai.insights.optimizeOffers')}
            message={t('ai.insights.optimizeOffersMsg')}
            action={t('ai.insights.viewStrategy')}
            onAction={() => alert(t('ai.insights.viewStrategy'))}
            confidence={91}
          />
          <AIInsightCard
            type="prediction"
            title={t('ai.insights.cashFlowOpportunity')}
            message={t('ai.insights.cashFlowOpportunityMsg')}
            action={t('ai.insights.viewDetails')}
            onAction={() => alert(t('ai.insights.viewDetails'))}
            confidence={88}
          />
        </div>
      </div>

      <AIChatBot />
    </div>
  );
}
