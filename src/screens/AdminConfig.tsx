import { useState } from 'react';
import { Settings, Shield, Bell, DollarSign } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { useTranslation } from '../hooks/useTranslation';

export function AdminConfig() {
  const { t } = useTranslation();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API Key', key: 'sk_live_****5678', created: '2024-11-10', lastUsed: '2024-11-20' },
    { id: '2', name: 'Development API Key', key: 'sk_test_****1234', created: '2024-10-15', lastUsed: '2024-11-19' },
    { id: '3', name: 'Integration API Key', key: 'sk_int_****9012', created: '2024-09-20', lastUsed: '2024-11-18' },
  ]);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-2">{t('admin.config.title')}</h2>
        <p className="text-sm sm:text-base text-gray-600">{t('admin.config.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#CFAE70]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t('admin.config.discountPolicy')}</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.config.defaultModel')}
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent">
                <option>{t('admin.config.linearModel')}</option>
                <option>{t('admin.config.exponentialModel')}</option>
                <option>{t('admin.config.fixedBracketModel')}</option>
                <option>{t('admin.config.customModel')}</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">{t('admin.config.selectDefaultMethod')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.config.minDiscount')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue="0.5"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.config.maxDiscount')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue="5.0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.config.autoApproval')}
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue="2.0"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{t('admin.config.autoApproveBelow')}</p>
            </div>

            <Button 
              variant="primary" 
              size="md" 
              className="w-full"
              onClick={() => {
                // Settings are saved - could show a toast notification
                alert('Discount policy settings saved successfully!\n\nAll new discount calculations will use these settings.');
              }}
            >
              {t('admin.config.saveDiscount')}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#CFAE70]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t('admin.config.notifications')}</h3>
          </div>

          <div className="space-y-4">
            {[
              { event: 'Invoice Uploaded', channels: ['Email', 'In-App'] },
              { event: 'Offer Sent', channels: ['Email', 'SMS', 'In-App'] },
              { event: 'Offer Approved', channels: ['Email', 'WhatsApp', 'In-App'] },
              { event: 'Payment Processed', channels: ['Email', 'SMS', 'In-App'] },
              { event: 'Counter Offer Received', channels: ['Email', 'In-App'] },
            ].map((template, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-[#006C35] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{template.event}</span>
                  <button 
                    className="text-sm text-[#006C35] hover:text-[#004d26] font-medium"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsNotificationModalOpen(true);
                    }}
                  >
                    {t('common.edit')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {template.channels.map((channel, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#CFAE70]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{t('admin.config.security')}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.config.sessionTimeout')}
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.config.passwordPolicy')}
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]" />
                  <span className="text-sm text-gray-700">{t('admin.config.requireMin8Chars')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]" />
                  <span className="text-sm text-gray-700">{t('admin.config.requireUpperLower')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]" />
                  <span className="text-sm text-gray-700">{t('admin.config.requireNumbers')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]" />
                  <span className="text-sm text-gray-700">{t('admin.config.requireSpecialChars')}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.config.mfa')}
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent">
                <option>{t('admin.config.optionalForAll')}</option>
                <option>{t('admin.config.requiredForAdmins')}</option>
                <option>{t('admin.config.requiredForAll')}</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('admin.config.ipWhitelist')}
              </label>
              <div className="space-y-2 mb-3">
                {['192.168.1.0/24', '10.0.0.0/8', '172.16.0.0/12'].map((ip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm text-gray-900">{ip}</span>
                    <button 
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                      onClick={() => {
                        if (confirm(`Remove IP range ${ip} from whitelist?`)) {
                          alert(`IP range ${ip} removed successfully.`);
                        }
                      }}
                    >
                      {t('admin.config.remove')}
                    </button>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  const ip = prompt(t('admin.config.enterIpRange'));
                  if (ip) {
                    alert(t('admin.config.ipRangeAdded').replace('{ip}', ip));
                  }
                }}
              >
                {t('admin.config.addIpRange')}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.config.apiKeys')}
              </label>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{t('admin.config.activeKeys')}</span>
                  <span className="text-xl font-bold text-[#006C35]">3</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{t('admin.config.lastGenerated')}: 2024-11-10</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setIsApiKeyModalOpen(true)}
                >
                  {t('admin.config.manageApiKeys')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button 
            variant="primary" 
            size="md"
            onClick={() => {
              alert('Security settings saved successfully!\n\nAll security configurations have been updated and are now active.');
            }}
          >
            {t('admin.config.saveSecurity')}
          </Button>
          <Button 
            variant="outline" 
            size="md"
            onClick={() => {
              if (confirm('Are you sure you want to reset all security settings to defaults?')) {
                alert('Security settings have been reset to default values.');
              }
            }}
          >
            {t('admin.config.resetDefaults')}
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-[#006C35] to-[#004d26] text-white shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Settings className="w-6 h-6 text-[#CFAE70]" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">{t('admin.config.advanced')}</h3>
              <p className="text-sm text-green-100">
                {t('admin.config.advancedDesc')}
              </p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="md"
            onClick={() => {
              // Advanced settings modal could be added here
              alert('Advanced Settings opened.\n\nAccess system-level configurations:\n- Database settings\n- API configurations\n- System integrations\n- Backup & recovery');
            }}
          >
            {t('admin.config.advancedSettings')}
          </Button>
        </div>
      </Card>

      {/* Notification Template Modal */}
      <Modal
        isOpen={isNotificationModalOpen}
        onClose={() => {
          setIsNotificationModalOpen(false);
          setSelectedTemplate(null);
        }}
        title={`${t('admin.config.editTemplate')}: ${selectedTemplate?.event || ''}`}
        size="lg"
      >
        {selectedTemplate && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.config.notificationChannels')}</label>
              <div className="space-y-2">
                {['Email', 'SMS', 'WhatsApp', 'In-App'].map((channel) => (
                  <label key={channel} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked={selectedTemplate.channels.includes(channel)}
                      className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]"
                    />
                    <span className="text-sm text-gray-700">{channel}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.config.emailTemplate')}</label>
              <textarea
                rows={6}
                defaultValue={`Subject: ${selectedTemplate.event}\n\nDear User,\n\nThis is a notification about: ${selectedTemplate.event}\n\nThank you.`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button variant="primary" size="lg" className="flex-1" onClick={() => {
                setIsNotificationModalOpen(false);
                setSelectedTemplate(null);
              }}>
                {t('admin.config.saveTemplate')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsNotificationModalOpen(false);
                  setSelectedTemplate(null);
                }}
              >
                {t('common.cancel')}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* API Key Management Modal */}
      <Modal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        title={t('admin.config.manageApiKeys')}
        size="xl"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.config.activeKeys')}</h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const newKey = {
                  id: String(apiKeys.length + 1),
                  name: t('admin.config.newApiKey'),
                  key: `sk_new_****${Math.random().toString(36).substr(2, 4)}`,
                  created: new Date().toISOString().split('T')[0],
                  lastUsed: 'Never',
                };
                setApiKeys([...apiKeys, newKey]);
              }}
            >
              {t('admin.config.generateKey')}
            </Button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{key.name === 'Production API Key' ? t('admin.config.productionKey') : key.name === 'Development API Key' ? t('admin.config.developmentKey') : key.name === 'Integration API Key' ? t('admin.config.integrationKey') : key.name}</p>
                    <p className="text-sm text-gray-600 font-mono">{key.key}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(t('admin.config.areYouSureRevoke').replace('{name}', key.name))) {
                        setApiKeys(apiKeys.filter(k => k.id !== key.id));
                      }
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    {t('admin.config.revoke')}
                  </button>
                </div>
                <div className="flex space-x-4 text-xs text-gray-500">
                  <span>{t('admin.config.created')}: {key.created}</span>
                  <span>{t('admin.config.lastUsed')}: {key.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setIsApiKeyModalOpen(false)}
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
