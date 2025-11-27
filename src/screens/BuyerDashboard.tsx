import { useState } from 'react';
import { DollarSign, TrendingUp, PiggyBank, Users, RefreshCw, Download, Brain } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KPICard, Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { AIInsightCard } from '../components/AI/AIInsightCard';
import { AIChatBot } from '../components/AI/AIChatBot';
import { useTranslation } from '../hooks/useTranslation';

export function BuyerDashboard() {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [showAllSuppliers, setShowAllSuppliers] = useState(false);

  const suppliers = [
    { name: 'Al-Rashid Trading Co.', invoices: 12, amount: 1250000, discount: 48000 },
    { name: 'Saudi Industrial Supplies', invoices: 8, amount: 890000, discount: 32000 },
    { name: 'Gulf Manufacturing Ltd.', invoices: 15, amount: 2100000, discount: 75000 },
    { name: 'Modern Equipment Corp.', invoices: 6, amount: 450000, discount: 18000 },
  ];

  // Monthly discount performance data
  const monthlyData = [
    { month: 'Jan', discount: 45, savings: 120000 },
    { month: 'Feb', discount: 52, savings: 135000 },
    { month: 'Mar', discount: 48, savings: 128000 },
    { month: 'Apr', discount: 61, savings: 155000 },
    { month: 'May', discount: 55, savings: 142000 },
    { month: 'Jun', discount: 68, savings: 173000 },
  ];

  // Invoice aging data
  const agingData = [
    { name: '0-30 Days', value: 1800000, color: '#006C35' },
    { name: '31-60 Days', value: 1500000, color: '#CFAE70' },
    { name: '61-90 Days', value: 980000, color: '#3B82F6' },
    { name: '90+ Days', value: 410000, color: '#F97316' },
  ];

  // Supplier performance data
  const supplierData = suppliers.map(s => ({
    name: s.name.split(' ')[0],
    amount: s.amount / 1000,
    discount: s.discount / 1000,
  }));

  // Discount rate distribution
  const discountRateData = [
    { range: '0-1%', count: 8 },
    { range: '1-2%', count: 15 },
    { range: '2-3%', count: 12 },
    { range: '3-4%', count: 6 },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleExport = () => {
    // Simulate export
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,Supplier,Invoices,Amount,Discount\n';
    link.download = 'suppliers-report.csv';
    link.click();
  };

  const displayedSuppliers = showAllSuppliers ? suppliers : suppliers.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-2">{t('dashboard.overview')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('dashboard.monitor')}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:space-x-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex-1 sm:flex-initial"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            <span className="sm:hidden">{refreshing ? '...' : t('common.refresh')}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex-1 sm:flex-initial"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">{t('payment.exportReport')}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard
          title={t('dashboard.totalPayable')}
          value="SAR 4.69M"
          subtitle={t('dashboard.totalPayableSubtitle')}
          icon={<DollarSign className="w-6 h-6 text-[#CFAE70]" />}
          trend={{ value: '12%', isPositive: true }}
        />
        <KPICard
          title={t('dashboard.cashUtilized')}
          value="SAR 2.1M"
          subtitle={t('dashboard.cashUtilizedSubtitle')}
          icon={<TrendingUp className="w-6 h-6 text-[#CFAE70]" />}
          trend={{ value: '8%', isPositive: true }}
        />
        <KPICard
          title={t('dashboard.discountSavings')}
          value="SAR 173K"
          subtitle={t('dashboard.discountSavingsSubtitle')}
          icon={<PiggyBank className="w-6 h-6 text-[#CFAE70]" />}
          trend={{ value: '24%', isPositive: true }}
        />
        <KPICard
          title={t('dashboard.activeSuppliers')}
          value="28"
          subtitle={t('dashboard.activeSuppliersSubtitle')}
          icon={<Users className="w-6 h-6 text-[#CFAE70]" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('dashboard.invoiceAging')}</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{t('dashboard.days0to30')}</span>
                <span className="font-medium text-gray-900">SAR 1.8M (38%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#006C35] rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{t('dashboard.days31to60')}</span>
                <span className="font-medium text-gray-900">SAR 1.5M (32%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#CFAE70] rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{t('dashboard.days61to90')}</span>
                <span className="font-medium text-gray-900">SAR 980K (21%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{t('dashboard.days90plus')}</span>
                <span className="font-medium text-gray-900">SAR 410K (9%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('dashboard.monthlyPerformance')}</h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number) => [`SAR ${value.toLocaleString()}`, 'Savings']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#006C35"
                strokeWidth={3}
                dot={{ fill: '#006C35', r: 5 }}
                name="Discount Savings (SAR)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('dashboard.supplierPerformance')}</h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <BarChart data={supplierData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number) => [`SAR ${value}K`, '']}
              />
              <Legend />
              <Bar dataKey="amount" fill="#006C35" name={t('dashboard.chartInvoiceAmount')} />
              <Bar dataKey="discount" fill="#CFAE70" name={t('dashboard.chartDiscountEarned')} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t('dashboard.invoiceAgingDistribution')}</h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <PieChart>
              <Pie
                data={agingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {agingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number) => `SAR ${(value / 1000).toFixed(0)}K`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.discountRateDistribution')}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={discountRateData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" stroke="#6B7280" />
            <YAxis dataKey="range" type="category" stroke="#6B7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            />
            <Bar dataKey="count" fill="#006C35" name={t('dashboard.chartNumberOfInvoices')} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 hover">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent">{t('dashboard.topSuppliers')}</h3>
          <button 
            className="text-sm text-[#006C35] hover:text-[#004d26] font-medium"
            onClick={() => setShowAllSuppliers(!showAllSuppliers)}
          >
            {showAllSuppliers ? t('common.showLess') : t('dashboard.viewAll')} →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('dashboard.supplierName')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('dashboard.invoices')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('dashboard.totalAmount')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('dashboard.discountEarned')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedSuppliers.map((supplier, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#006C35]/5 hover:to-transparent transition-all duration-300">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{supplier.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{supplier.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{supplier.invoices}</td>
                  <td className="py-4 px-4 text-gray-900 font-medium">SAR {(supplier.amount / 1000).toFixed(0)}K</td>
                  <td className="py-4 px-4">
                    <span className="text-green-600 font-semibold">SAR {(supplier.discount / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            title={t('ai.insights.optimizePayment')}
            message={t('ai.insights.optimizePaymentMsg')}
            action={t('ai.insights.viewRecommendations')}
            onAction={() => alert(t('ai.insights.viewRecommendations'))}
            confidence={92}
          />
          <AIInsightCard
            type="prediction"
            title={t('ai.insights.cashFlowForecast')}
            message={t('ai.insights.cashFlowForecastMsg')}
            action={t('ai.insights.viewForecast')}
            onAction={() => alert(t('ai.insights.viewForecast'))}
            confidence={87}
          />
          <AIInsightCard
            type="suggestion"
            title={t('ai.insights.supplierOpportunity')}
            message={t('ai.insights.supplierOpportunityMsg')}
            action={t('ai.insights.createOffer')}
            onAction={() => alert(t('ai.insights.createOffer'))}
            confidence={95}
          />
          <AIInsightCard
            type="alert"
            title={t('ai.insights.timeSensitive')}
            message={t('ai.insights.timeSensitiveMsg')}
            action={t('ai.insights.reviewNow')}
            onAction={() => alert(t('ai.insights.reviewNow'))}
            confidence={89}
          />
        </div>
      </div>

      <AIChatBot />
    </div>
  );
}
