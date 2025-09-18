import { Business, Customer, Item, Invoice } from './types';

export const MOCK_BUSINESS: Business = {
  id: 'b_123',
  name: 'Innovate Solutions Inc.',
  address: '123 Tech Park, Silicon Valley, CA 94043',
  phone: '+1 (555) 123-4567',
  email: 'contact@innovatesolutions.com',
  gstin: '22AAAAA0000A1Z5',
};

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c_456', name: 'Global Tech Corp', email: 'accounts@globaltech.com', billingAddress: '456 Enterprise Rd, NYC', gstin: '29BBBBB1111B2Z6' },
  { id: 'c_789', name: 'Startup Hub LLC', email: 'billing@startuphub.io', billingAddress: '789 Innovation Ave, Austin', gstin: '36CCCCC2222C3Z7' },
  { id: 'c_101', name: 'Creative Minds Agency', email: 'finance@creativeminds.com', billingAddress: '101 Art Street, Miami', gstin: '12DDDDD3333D4Z8' },
];

export const MOCK_ITEMS: Item[] = [
  { id: 'i_1', sku: 'WDGT-A', name: 'Widget A', description: 'High-performance widget for enterprise solutions.', unitPrice: 499.0, gstRate: 18 },
  { id: 'i_2', sku: 'SRVC-B', name: 'Service B', description: 'Consulting service package (10 hours).', unitPrice: 1200.0, gstRate: 18 },
  { id: 'i_3', sku: 'PROD-C', name: 'Product C', description: 'Standard consumer-grade product.', unitPrice: 89.99, gstRate: 12 },
  { id: 'i_4', sku: 'LIC-D', name: 'License D', description: 'Annual software license.', unitPrice: 250.0, gstRate: 5 },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_1',
    invoiceNumber: 'INV-2024-001',
    customerId: 'c_456',
    date: '2024-07-15',
    dueDate: '2024-07-30',
    notes: 'Thank you for your business.',
    status: 'paid',
    total: 2476.82,
    businessId: 'b_123',
    lines: [],
  },
  {
    id: 'inv_2',
    invoiceNumber: 'INV-2024-002',
    customerId: 'c_789',
    date: '2024-07-18',
    dueDate: '2024-08-02',
    notes: 'Initial consultation services.',
    status: 'partially_paid',
    total: 1416.00,
    businessId: 'b_123',
    lines: [],
  },
  {
    id: 'inv_3',
    invoiceNumber: 'INV-2024-003',
    customerId: 'c_101',
    date: '2024-07-20',
    dueDate: '2024-08-04',
    notes: 'Please pay by due date.',
    status: 'draft',
    total: 313.58,
    businessId: 'b_123',
    lines: [],
  },
    {
    id: 'inv_4',
    invoiceNumber: 'INV-2024-004',
    customerId: 'c_456',
    date: '2024-06-01',
    dueDate: '2024-06-15',
    notes: 'Quarterly license renewal.',
    status: 'overdue',
    total: 262.50,
    businessId: 'b_123',
    lines: [],
  }
];
