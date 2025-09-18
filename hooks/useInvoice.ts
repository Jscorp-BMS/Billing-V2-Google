import { useReducer } from 'react';
import { Invoice, InvoiceLine, Item } from '../types';

type InvoiceAction =
  | { type: 'UPDATE_FIELD'; field: keyof Omit<Invoice, 'lines'>; value: any }
  | { type: 'ADD_LINE'; item?: Item }
  | { type: 'UPDATE_LINE'; index: number; field: keyof InvoiceLine; value: any }
  | { type: 'REMOVE_LINE'; index: number }
  | { type: 'SET_CUSTOMER'; customerId: string | null }
  | { type: 'SET_NOTES'; notes: string };

const getInitialDate = () => new Date().toISOString().split('T')[0];

const getDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14); // Default due date 14 days from now
  return date.toISOString().split('T')[0];
};

const newInvoiceInitialState: Invoice = {
  id: `inv_${Date.now()}`,
  invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
  businessId: 'b_123',
  customerId: null,
  date: getInitialDate(),
  dueDate: getDueDate(),
  lines: [
    { id: `line-${Date.now()}`, itemId: '', description: '', qty: 1, unitPrice: 0, gstRate: 0 },
  ],
  notes: 'Thank you for your business. Please make payments by the due date.',
  status: 'draft',
};

function invoiceReducer(state: Invoice, action: InvoiceAction): Invoice {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_CUSTOMER':
      return { ...state, customerId: action.customerId };
    case 'ADD_LINE':
        const newLine = action.item ? {
            id: `line-${Date.now()}`,
            itemId: action.item.id,
            description: action.item.description,
            qty: 1,
            unitPrice: action.item.unitPrice,
            gstRate: action.item.gstRate
        } : { id: `line-${Date.now()}`, itemId: '', description: '', qty: 1, unitPrice: 0, gstRate: 0 };
        return { ...state, lines: [...state.lines, newLine] };
    case 'UPDATE_LINE': {
      const newLines = [...state.lines];
      const lineToUpdate = { ...newLines[action.index], [action.field]: action.value };
      
      // Coerce qty and unitPrice to numbers
      if (action.field === 'qty' || action.field === 'unitPrice' || action.field === 'gstRate') {
          (lineToUpdate as any)[action.field] = Number(action.value) || 0;
      }
      
      newLines[action.index] = lineToUpdate;
      return { ...state, lines: newLines };
    }
    case 'REMOVE_LINE': {
      const filteredLines = state.lines.filter((_, i) => i !== action.index);
      return { ...state, lines: filteredLines.length > 0 ? filteredLines : [newInvoiceInitialState.lines[0]] };
    }
    case 'SET_NOTES': {
      return { ...state, notes: action.notes };
    }
    default:
      return state;
  }
}

export const useInvoice = (existingInvoice?: Invoice | null) => {
  const [invoice, dispatch] = useReducer(invoiceReducer, existingInvoice || newInvoiceInitialState);

  const subtotal = invoice.lines.reduce((acc, line) => acc + (line.qty * line.unitPrice), 0);
  const taxTotal = invoice.lines.reduce((acc, line) => acc + (line.qty * line.unitPrice * (line.gstRate / 100)), 0);
  const total = subtotal + taxTotal;

  return { invoice, dispatch, subtotal, taxTotal, total };
};