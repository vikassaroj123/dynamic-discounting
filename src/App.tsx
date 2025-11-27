import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckCircle, Users, Database, Settings, Calculator, DollarSign, Building2, Package } from 'lucide-react';
import { UserRole } from './types';
import { Header } from './components/Layout/Header';
import { PublicHeader } from './components/Layout/PublicHeader';
import { Sidebar } from './components/Layout/Sidebar';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { Contact } from './screens/Contact';
import { Login } from './screens/Login';
import { BuyerDashboard } from './screens/BuyerDashboard';
import { BuyerInvoices } from './screens/BuyerInvoices';
import { BuyerApprovals } from './screens/BuyerApprovals';
import { SupplierDashboard } from './screens/SupplierDashboard';
import { SupplierOffers } from './screens/SupplierOffers';
import { SupplierBankDetails } from './screens/SupplierBankDetails';
import { AdminUsers } from './screens/AdminUsers';
import { AdminERP } from './screens/AdminERP';
import { AdminConfig } from './screens/AdminConfig';
import { DiscountEngine } from './screens/DiscountEngine';
import { PaymentProcessing } from './screens/PaymentProcessing';
import { TranslationProvider, useTranslation } from './hooks/useTranslation';

function DashboardLayout({ 
  currentRole, 
  activeScreen, 
  setActiveScreen, 
  onLogout 
}: { 
  currentRole: UserRole; 
  activeScreen: string; 
  setActiveScreen: (screen: string) => void;
  onLogout: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dir, t } = useTranslation();

  const buyerMenuItems = [
    { id: 'dashboard', label: t('sidebar.dashboard'), icon: LayoutDashboard },
    { id: 'invoices', label: t('sidebar.invoices'), icon: FileText },
    { id: 'approvals', label: t('sidebar.approvals'), icon: CheckCircle },
    { id: 'discount-engine', label: t('sidebar.discountEngine'), icon: Calculator },
    { id: 'payments', label: t('sidebar.payments'), icon: DollarSign },
  ];

  const supplierMenuItems = [
    { id: 'dashboard', label: t('sidebar.dashboard'), icon: LayoutDashboard },
    { id: 'offers', label: t('sidebar.offers'), icon: Package },
    { id: 'bank-details', label: t('sidebar.bankDetails'), icon: Building2 },
  ];

  const adminMenuItems = [
    { id: 'users', label: t('sidebar.users'), icon: Users },
    { id: 'erp', label: t('sidebar.erp'), icon: Database },
    { id: 'config', label: t('sidebar.config'), icon: Settings },
    { id: 'discount-engine', label: t('sidebar.discountEngine'), icon: Calculator },
    { id: 'payments', label: t('sidebar.payments'), icon: DollarSign },
  ];

  const getMenuItems = () => {
    switch (currentRole) {
      case 'buyer': return buyerMenuItems;
      case 'supplier': return supplierMenuItems;
      case 'admin': return adminMenuItems;
      default: return buyerMenuItems;
    }
  };

  const getUserName = () => {
    switch (currentRole) {
      case 'buyer': return 'Ahmed Al-Zahrani';
      case 'supplier': return 'Abdullah Al-Rashid';
      case 'admin': return 'System Administrator';
      default: return 'User';
    }
  };

  const renderScreen = () => {
    if (currentRole === 'buyer') {
      switch (activeScreen) {
        case 'dashboard': return <BuyerDashboard />;
        case 'invoices': return <BuyerInvoices />;
        case 'approvals': return <BuyerApprovals />;
        case 'discount-engine': return <DiscountEngine />;
        case 'payments': return <PaymentProcessing />;
        default: return <BuyerDashboard />;
      }
    }

    if (currentRole === 'supplier') {
      switch (activeScreen) {
        case 'dashboard': return <SupplierDashboard />;
        case 'offers': return <SupplierOffers />;
        case 'bank-details': return <SupplierBankDetails />;
        default: return <SupplierDashboard />;
      }
    }

    if (currentRole === 'admin') {
      switch (activeScreen) {
        case 'users': return <AdminUsers />;
        case 'erp': return <AdminERP />;
        case 'config': return <AdminConfig />;
        case 'discount-engine': return <DiscountEngine />;
        case 'payments': return <PaymentProcessing />;
        default: return <AdminUsers />;
      }
    }

    return <BuyerDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header
        role={currentRole}
        userName={getUserName()}
        onLogout={onLogout}
        notificationCount={3}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      <div className="flex relative">
        <Sidebar
          items={getMenuItems()}
          activeItem={activeScreen}
          onItemClick={setActiveScreen}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
        <main className={`flex-1 min-h-[calc(100vh-73px)] lg:ml-0 w-full transition-all duration-300 ${isMenuOpen ? 'lg:ml-0' : ''}`}>
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRole('buyer');
    setActiveScreen('dashboard');
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <PublicHeader />
            <Home />
          </>
        } />
        <Route path="/about" element={
          <>
            <PublicHeader />
            <About />
          </>
        } />
        <Route path="/contact" element={
          <>
            <PublicHeader />
            <Contact />
          </>
        } />
        <Route path="/login" element={
          !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <DashboardLayout
              currentRole={currentRole}
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}

export default App;
