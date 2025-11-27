import { useState } from 'react';
import { Database, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { useTranslation } from '../hooks/useTranslation';

export function AdminERP() {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [integrations, setIntegrations] = useState([
    { id: '1', name: 'SAP', logo: 'S', status: 'connected', lastSync: '2 mins ago', invoices: 1234, errors: 0, color: 'blue' },
    { id: '2', name: 'Oracle ERP', logo: 'O', status: 'connected', lastSync: '5 mins ago', invoices: 856, errors: 2, color: 'red' },
    { id: '3', name: 'Microsoft Dynamics 365', logo: 'D', status: 'connected', lastSync: '10 mins ago', invoices: 642, errors: 0, color: 'green' },
    { id: '4', name: 'Odoo', logo: 'Od', status: 'disconnected', lastSync: '2 hours ago', invoices: 0, errors: 15, color: 'purple' },
    { id: '5', name: 'Zoho Books', logo: 'Z', status: 'connected', lastSync: '15 mins ago', invoices: 423, errors: 1, color: 'orange' },
    { id: '6', name: 'Tally', logo: 'T', status: 'pending', lastSync: 'Never', invoices: 0, errors: 0, color: 'gray' },
  ]);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: 'SAP',
    apiKey: '',
    endpoint: '',
  });

  const recentLogs = [
    { timestamp: '2024-11-20 14:32', system: 'SAP', action: 'Invoice Sync', status: 'success', count: 24 },
    { timestamp: '2024-11-20 14:28', system: 'Oracle ERP', action: 'Payment Update', status: 'warning', count: 12 },
    { timestamp: '2024-11-20 14:25', system: 'Dynamics 365', action: 'Supplier Sync', status: 'success', count: 8 },
    { timestamp: '2024-11-20 14:15', system: 'Zoho Books', action: 'Invoice Sync', status: 'success', count: 15 },
    { timestamp: '2024-11-20 13:45', system: 'Odoo', action: 'Connection Test', status: 'error', count: 0 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disconnected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'disconnected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-2">{t('admin.erp.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('admin.erp.subtitle')}</p>
        </div>
        <Button 
          variant="primary" 
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Database className="w-4 h-4 mr-2" />
          {t('admin.erp.addIntegration')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('admin.erp.connectedSystems')}</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">4</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.erp.outOfConfigured')}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('admin.erp.totalSynced')}</h3>
            <RefreshCw className="w-5 h-5 text-[#006C35]" />
          </div>
          <p className="text-3xl font-bold text-gray-900">3,155</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.erp.invoicesToday')}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('admin.erp.successRate')}</h3>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">✓</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">99.4%</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.erp.last30Days')}</p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{t('admin.erp.activeErrors')}</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">18</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.erp.requiresAttention')}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="p-4 sm:p-6 hover border-2 border-transparent hover:border-[#006C35]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-${integration.color}-100 rounded-lg flex items-center justify-center`}>
                  <span className={`text-${integration.color}-600 font-bold text-lg`}>{integration.logo}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{integration.name}</h3>
                  <p className="text-xs text-gray-600">Last sync: {integration.lastSync}</p>
                </div>
              </div>
              {getStatusIcon(integration.status)}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(integration.status)}`}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('admin.erp.invoicesSynced')}</span>
                <span className="text-sm font-semibold text-gray-900">{integration.invoices.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('admin.erp.errors')}</span>
                <span className={`text-sm font-semibold ${integration.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {integration.errors}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 w-full sm:w-auto"
                onClick={() => {
                  // Update last sync time
                  setIntegrations(integrations.map(i => 
                    i.id === integration.id 
                      ? { ...i, lastSync: 'Just now', invoices: i.invoices + Math.floor(Math.random() * 10) }
                      : i
                  ));
                }}
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                {t('admin.erp.sync')}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 w-full sm:w-auto"
                onClick={() => {
                  setSelectedIntegration(integration);
                  setIsConfigModalOpen(true);
                }}
              >
                {t('admin.erp.configure')}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('admin.erp.syncActivity')}</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                alert('Activity log refreshed. Showing latest sync activities.');
              }}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              {t('common.refresh')}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                alert('Sync activity logs exported successfully!');
              }}
              className="flex-1 sm:flex-initial"
            >
              Export Logs
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.erp.timestamp')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.erp.system')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">{t('admin.erp.action')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('common.status')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">{t('admin.erp.records')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.erp.action')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700">{log.timestamp}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{log.system}</span>
                      <div className="text-xs text-gray-500 md:hidden mt-1">{log.action}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{log.action}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`text-xs sm:text-sm font-semibold capitalize ${getLogStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden lg:table-cell">{log.count}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <button 
                        className="text-xs sm:text-sm text-[#006C35] hover:text-[#004d26] font-medium"
                        onClick={() => {
                          // Could open a modal here for detailed log view
                          alert(`Sync Log Details:\n\nSystem: ${log.system}\nAction: ${log.action}\nStatus: ${log.status}\nRecords: ${log.count}\nTimestamp: ${log.timestamp}`);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-[#006C35] to-[#004d26] text-white shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Database className="w-6 h-6 text-[#CFAE70]" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">{t('admin.erp.manageSchedule')}</h3>
              <p className="text-sm text-green-100">
                {t('admin.erp.scheduleDesc')}
              </p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="md"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            {t('admin.erp.manageSchedule')}
          </Button>
        </div>
      </Card>

      {/* Add Integration Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setNewIntegration({ name: '', type: 'SAP', apiKey: '', endpoint: '' });
        }}
        title={t('admin.erp.addIntegrationTitle')}
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newId = String(integrations.length + 1);
            setIntegrations([...integrations, {
              id: newId,
              name: newIntegration.name,
              logo: newIntegration.name.charAt(0),
              status: 'pending',
              lastSync: 'Never',
              invoices: 0,
              errors: 0,
              color: 'blue',
            }]);
            setIsAddModalOpen(false);
            setNewIntegration({ name: '', type: 'SAP', apiKey: '', endpoint: '' });
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.erp.erpSystem')}</label>
            <select
              required
              value={newIntegration.type}
              onChange={(e) => setNewIntegration({ ...newIntegration, type: e.target.value, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
            >
              <option>SAP</option>
              <option>Oracle ERP</option>
              <option>Microsoft Dynamics 365</option>
              <option>Odoo</option>
              <option>Zoho Books</option>
              <option>Tally</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.erp.apiEndpoint')}</label>
            <input
              type="text"
              required
              value={newIntegration.endpoint}
              onChange={(e) => setNewIntegration({ ...newIntegration, endpoint: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              placeholder="https://api.example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.erp.apiKey')}</label>
            <input
              type="password"
              required
              value={newIntegration.apiKey}
              onChange={(e) => setNewIntegration({ ...newIntegration, apiKey: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              placeholder="Enter API key"
            />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              After adding the integration, you'll need to configure sync settings and data mapping.
            </p>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" size="lg" className="flex-1">
              {t('admin.erp.addIntegration')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setIsAddModalOpen(false);
                setNewIntegration({ name: '', type: 'SAP', apiKey: '', endpoint: '' });
              }}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Configure Integration Modal */}
      <Modal
        isOpen={isConfigModalOpen}
        onClose={() => {
          setIsConfigModalOpen(false);
          setSelectedIntegration(null);
        }}
        title={`Configure ${selectedIntegration?.name || 'Integration'}`}
        size="lg"
      >
        {selectedIntegration && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.erp.syncFrequency')}</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent">
                <option>{t('admin.erp.every15Minutes')}</option>
                <option>{t('admin.erp.every30Minutes')}</option>
                <option>{t('admin.erp.everyHour')}</option>
                <option>{t('admin.erp.every6Hours')}</option>
                <option>{t('admin.erp.daily')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.erp.dataMapping')}</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{t('admin.erp.invoiceNumberMapping')}</span>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>{t('admin.erp.invoiceNo')}</option>
                    <option>{t('admin.erp.invoiceNumberAlt')}</option>
                    <option>{t('admin.erp.docNumber')}</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{t('admin.erp.amountMapping')}</span>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>amount</option>
                    <option>{t('admin.erp.totalAmountAlt')}</option>
                    <option>{t('admin.erp.value')}</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{t('admin.erp.dueDateMapping')}</span>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>due_date</option>
                    <option>{t('admin.erp.paymentDue')}</option>
                    <option>{t('admin.erp.maturityDate')}</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.erp.errorHandling')}</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">{t('admin.erp.autoRetryFailed')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">{t('admin.erp.sendEmailOnErrors')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-[#006C35] border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">{t('admin.erp.pauseOnFailures')}</span>
                </label>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button variant="primary" size="lg" className="flex-1" onClick={() => {
                setIntegrations(integrations.map(i => 
                  i.id === selectedIntegration.id ? { ...i, status: 'connected' } : i
                ));
                setIsConfigModalOpen(false);
                setSelectedIntegration(null);
              }}>
                Save Configuration
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsConfigModalOpen(false);
                  setSelectedIntegration(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Sync Schedule Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title={t('admin.erp.manageSchedule')}
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.erp.syncFrequency')}</h3>
            <div className="space-y-4">
              {integrations.filter(i => i.status === 'connected').map((integration) => (
                <div key={integration.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-900">{integration.name}</span>
                    <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#006C35]">
                      <option>{t('admin.erp.every15Minutes')}</option>
                      <option>{t('admin.erp.every30Minutes')}</option>
                      <option>{t('admin.erp.everyHour')}</option>
                      <option>{t('admin.erp.every6Hours')}</option>
                      <option>{t('admin.erp.daily')}</option>
                      <option>{t('admin.erp.weekly')}</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded" />
                    <span>{t('admin.erp.enableAutomaticSync')}</span>
                  </div>
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
                setIsScheduleModalOpen(false);
              }}
            >
              {t('common.save')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
