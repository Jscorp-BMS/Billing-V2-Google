import React from 'react';
import { Customer } from '../../types';

interface CustomerSelectorProps {
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string | null) => void;
  customers: Customer[];
}

const CustomerSelector: React.FC<CustomerSelectorProps> = ({ selectedCustomerId, onSelectCustomer, customers }) => {
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <div>
      <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">Bill To</label>
      <select
        id="customer"
        className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
        value={selectedCustomerId || ''}
        onChange={(e) => onSelectCustomer(e.target.value)}
      >
        <option value="">Select a customer</option>
        {customers.map((customer: Customer) => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>
      {selectedCustomer && (
        <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <p className="font-semibold">{selectedCustomer.name}</p>
          <p>{selectedCustomer.billingAddress}</p>
          <p>GSTIN: {selectedCustomer.gstin}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerSelector;
