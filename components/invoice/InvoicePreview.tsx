import React from 'react';
import { Invoice, Business, Customer, Item } from '../../types';

interface InvoicePreviewProps {
  invoice: Omit<Invoice, 'lines'> & { lines: { id: string, itemId: string; description: string; qty: number; unitPrice: number; }[] };
  business: Business;
  customers: Customer[];
  items: Item[];
  subtotal: number;
  taxTotal: number;
  total: number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice, business, customers, items, subtotal, taxTotal, total }) => {
  const customer = customers.find(c => c.id === invoice.customerId);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div id="print-area" className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
      <div className="flex justify-between items-start pb-6 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
          <p className="text-xs text-gray-500 max-w-xs">{business.address}</p>
          <p className="text-xs text-gray-500">GSTIN: {business.gstin}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold uppercase text-gray-800">Invoice</h2>
          <p className="text-sm text-gray-500"># {invoice.invoiceNumber}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Bill To</h3>
          {customer ? (
            <>
              <p className="font-bold text-gray-800">{customer.name}</p>
              <p className="text-xs text-gray-600">{customer.billingAddress}</p>
              <p className="text-xs text-gray-600">GSTIN: {customer.gstin}</p>
            </>
          ) : (
            <p className="text-xs text-gray-500">No customer selected.</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm"><span className="font-semibold text-gray-600">Invoice Date:</span> {invoice.date}</p>
          <p className="text-sm"><span className="font-semibold text-gray-600">Due Date:</span> {invoice.dueDate}</p>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left font-semibold text-gray-600 p-2">Item</th>
              <th className="text-center font-semibold text-gray-600 p-2">Qty</th>
              <th className="text-right font-semibold text-gray-600 p-2">Price</th>
              <th className="text-right font-semibold text-gray-600 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lines.map(line => (
              <tr key={line.id} className="border-b">
                <td className="p-2">
                    <p className="font-medium text-gray-800">{items.find(i => i.id === line.itemId)?.name || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{line.description}</p>
                </td>
                <td className="text-center p-2 text-gray-600">{line.qty}</td>
                <td className="text-right p-2 text-gray-600">{formatCurrency(line.unitPrice)}</td>
                <td className="text-right p-2 font-medium text-gray-800">{formatCurrency(line.qty * line.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <div className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax (GST)</span>
            <span className="font-medium text-gray-800">{formatCurrency(taxTotal)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-900">Grand Total</span>
              <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t">
        <h4 className="text-sm font-semibold text-gray-600">Notes</h4>
        <p className="text-xs text-gray-500 whitespace-pre-line">{invoice.notes}</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
