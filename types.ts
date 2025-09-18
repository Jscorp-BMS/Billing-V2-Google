export interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  billingAddress: string;
  gstin: string;
}

export interface Item {
  id: string;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  gstRate: number; // in percent
}

export interface InvoiceLine {
  id: string;
  itemId: string;
  description: string;
  qty: number;
  unitPrice: number;
  gstRate: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  businessId: string;
  customerId: string | null;
  date: string;
  dueDate: string;
  lines: InvoiceLine[];
  notes: string;
  status: 'draft' | 'paid' | 'partially_paid' | 'overdue';
  total?: number; // Added for list view convenience
}
