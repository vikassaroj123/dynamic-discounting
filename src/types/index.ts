export type UserRole = 'buyer' | 'supplier' | 'admin';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  uploadDate: string;
  status: 'pending' | 'offered' | 'approved' | 'paid';
  supplierName: string;
  discountRate?: number;
  daysEarly?: number;
}

export interface Notification {
  id: string;
  type: 'email' | 'sms' | 'whatsapp' | 'in-app';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
}
