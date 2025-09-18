
import React from 'react';

interface InvoiceTotalsProps {
  subtotal: number;
  taxTotal: number;
  total: number;
}

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({ subtotal, taxTotal, total }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="flex justify-end">
        <div className="w-full md:w-64 space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-gray-800">{formatCurrency(taxTotal)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between text-base">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
            </div>
        </div>
    </div>
  );
};

export default InvoiceTotals;
