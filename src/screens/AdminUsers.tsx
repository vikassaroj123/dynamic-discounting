import { useState } from 'react';
import { UserPlus, Search, Shield, Edit, Trash2 } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { useTranslation } from '../hooks/useTranslation';

export function AdminUsers() {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoleConfigModalOpen, setIsRoleConfigModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState([
    { id: '1', name: 'Ahmed Al-Zahrani', email: 'ahmed.z@saudiaramco.com', role: 'Buyer Admin', company: 'Saudi Aramco', status: 'active', lastLogin: '2024-11-20' },
    { id: '2', name: 'Fatima Al-Qahtani', email: 'fatima.q@sabic.com', role: 'Buyer Finance', company: 'SABIC', status: 'active', lastLogin: '2024-11-19' },
    { id: '3', name: 'Mohammed Al-Dosari', email: 'm.dosari@gulf-mfg.com', role: 'Supplier User', company: 'Gulf Manufacturing Ltd.', status: 'active', lastLogin: '2024-11-20' },
    { id: '4', name: 'Sarah Al-Mutairi', email: 'sarah.m@modern-eq.com', role: 'Supplier User', company: 'Modern Equipment Corp.', status: 'active', lastLogin: '2024-11-18' },
    { id: '5', name: 'Abdullah Al-Rashid', email: 'abdullah@alrashid.com', role: 'Supplier Admin', company: 'Al-Rashid Trading Co.', status: 'active', lastLogin: '2024-11-20' },
  ]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Buyer User',
    company: '',
    status: 'active',
  });

  const getRoleBadgeColor = (role: string) => {
    if (role.includes('Admin')) return 'bg-purple-100 text-purple-700';
    if (role.includes('Finance')) return 'bg-blue-100 text-blue-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#006C35] to-[#004d26] bg-clip-text text-transparent mb-2">{t('admin.users.title')}</h2>
          <p className="text-sm sm:text-base text-gray-600">{t('admin.users.subtitle')}</p>
        </div>
        <Button 
          variant="primary" 
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {t('admin.users.addNew')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <Shield className="w-5 h-5 text-[#006C35]" />
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-500 mt-1">12 added this month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Buyers</h3>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">B</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">42</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.users.28Companies')}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Suppliers</h3>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">S</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">98</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.users.78Companies')}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Admins</h3>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">A</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">16</p>
          <p className="text-sm text-gray-500 mt-1">{t('admin.users.systemSuperAdmins')}</p>
        </Card>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder={t('admin.users.searchPlaceholder')}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
            />
          </div>
          <select className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent w-full sm:w-auto">
                <option>{t('admin.users.allRoles')}</option>
                <option>{t('admin.users.superAdmin')}</option>
                <option>{t('admin.users.buyerAdmin')}</option>
                <option>{t('admin.users.buyerFinance')}</option>
                <option>{t('admin.users.supplierAdmin')}</option>
                <option>{t('admin.users.supplierUser')}</option>
              </select>
          <select className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent w-full sm:w-auto">
            <option>{t('admin.users.allStatus')}</option>
            <option>{t('common.active')}</option>
            <option>{t('common.inactive')}</option>
            <option>{t('common.pending')}</option>
          </select>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.users.user')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">{t('admin.users.company')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.users.role')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">{t('common.status')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">{t('admin.users.lastLogin')}</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('admin.users.actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gradient-to-r hover:from-[#006C35]/5 hover:to-transparent transition-all duration-300">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-xs sm:text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500 md:hidden mt-1">{user.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{user.company}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 hidden lg:table-cell">{user.lastLogin}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex space-x-1 sm:space-x-2">
                        <button 
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Edit"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                        <button 
                          className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Delete"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
                              setUsers(users.filter(u => u.id !== user.id));
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#006C35] to-[#004d26] text-white shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#CFAE70]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold mb-1">{t('admin.users.roleConfig')}</h3>
              <p className="text-xs sm:text-sm text-green-100">
                {t('admin.users.roleConfigDesc')}
              </p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="md"
            onClick={() => setIsRoleConfigModalOpen(true)}
            className="w-full sm:w-auto"
          >
            {t('admin.users.configureRoles')}
          </Button>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setNewUser({ name: '', email: '', role: 'Buyer User', company: '', status: 'active' });
        }}
        title={t('admin.users.addNew')}
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newId = String(users.length + 1);
            setUsers([...users, { ...newUser, id: newId, lastLogin: 'Never' }]);
            setIsAddModalOpen(false);
            setNewUser({ name: '', email: '', role: 'Buyer User', company: '', status: 'active' });
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.fullName')}</label>
            <input
              type="text"
              required
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              placeholder={t('admin.users.enterName')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.emailAddress')}</label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              placeholder={t('admin.users.enterEmail')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.role')}</label>
              <select
                required
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              >
                <option>{t('admin.users.buyerAdmin')}</option>
                <option>{t('admin.users.buyerFinance')}</option>
                <option>{t('admin.users.buyerUser')}</option>
                <option>{t('admin.users.supplierAdmin')}</option>
                <option>{t('admin.users.supplierUser')}</option>
                <option>{t('admin.users.superAdmin')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.status')}</label>
              <select
                required
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              >
                <option value="active">{t('common.active')}</option>
                <option value="inactive">{t('common.inactive')}</option>
                <option value="pending">{t('common.pending')}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.company')}</label>
            <input
              type="text"
              required
              value={newUser.company}
              onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              placeholder={t('admin.users.enterCompany')}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" size="lg" className="flex-1">
              {t('admin.users.addUser')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setIsAddModalOpen(false);
                setNewUser({ name: '', email: '', role: 'Buyer User', company: '', status: 'active' });
              }}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title={t('admin.users.editUser')}
        size="lg"
      >
        {selectedUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUsers(users.map(u => u.id === selectedUser.id ? { ...selectedUser } : u));
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.fullName')}</label>
              <input
                type="text"
                required
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.emailAddress')}</label>
              <input
                type="email"
                required
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.role')}</label>
                <select
                  required
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                >
                <option>{t('admin.users.buyerAdmin')}</option>
                <option>{t('admin.users.buyerFinance')}</option>
                <option>{t('admin.users.buyerUser')}</option>
                <option>{t('admin.users.supplierAdmin')}</option>
                <option>{t('admin.users.supplierUser')}</option>
                <option>{t('admin.users.superAdmin')}</option>
              </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.status')}</label>
                <select
                  required
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
                >
                  <option value="active">{t('common.active')}</option>
                  <option value="inactive">{t('common.inactive')}</option>
                  <option value="pending">{t('common.pending')}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.users.company')}</label>
              <input
                type="text"
                required
                value={selectedUser.company}
                onChange={(e) => setSelectedUser({ ...selectedUser, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006C35] focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button type="submit" variant="primary" size="lg" className="flex-1">
                {t('admin.users.saveChanges')}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedUser(null);
                }}
              >
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Role Configuration Modal */}
      <Modal
        isOpen={isRoleConfigModalOpen}
        onClose={() => setIsRoleConfigModalOpen(false)}
        title="Role-Based Access Control"
        size="xl"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {['Super Admin', 'Buyer Admin', 'Buyer Finance', 'Supplier Admin', 'Supplier User'].map((role) => (
              <div key={role} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{role}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['View Dashboard', 'Manage Invoices', 'Process Payments', 'Manage Users', 'Configure Settings'].map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={role === 'Super Admin' || (role.includes('Admin') && !permission.includes('Configure'))}
                        className="w-4 h-4 text-[#006C35] border-gray-300 rounded focus:ring-[#006C35]"
                      />
                      <span className="text-sm text-gray-700">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => {
                setIsRoleConfigModalOpen(false);
              }}
            >
              Save Permissions
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsRoleConfigModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
