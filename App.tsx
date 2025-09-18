import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './components/dashboard/DashboardPage';
import InvoicesListPage from './components/invoices/InvoicesListPage';
import InvoicePage from './components/invoice/InvoicePage';
import CustomersListPage from './components/customers/CustomersListPage';
import ItemsListPage from './components/items/ItemsListPage';
import SettingsPage from './components/settings/SettingsPage';
import { MOCK_INVOICES, MOCK_CUSTOMERS, MOCK_ITEMS, MOCK_BUSINESS } from './constants';
import { Invoice, Customer, Item, Business } from './types';

function useHashNavigation() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return hash;
}

const App: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [business, setBusiness] = useState<Business>(MOCK_BUSINESS);

  const hash = useHashNavigation();
  
  const handleSaveInvoice = (invoiceToSave: Invoice) => {
    setInvoices(prevInvoices => {
      const index = prevInvoices.findIndex(inv => inv.id === invoiceToSave.id);
      const subtotal = invoiceToSave.lines.reduce((acc, line) => acc + (line.qty * line.unitPrice), 0);
      const taxTotal = invoiceToSave.lines.reduce((acc, line) => acc + (line.qty * line.unitPrice * (line.gstRate / 100)), 0);
      const total = subtotal + taxTotal;
      const invoiceWithTotal = { ...invoiceToSave, total };

      if (index > -1) {
        const newInvoices = [...prevInvoices];
        newInvoices[index] = invoiceWithTotal;
        return newInvoices;
      } else {
        return [invoiceWithTotal, ...prevInvoices];
      }
    });
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  };
  
  const renderPage = () => {
    if (hash.startsWith('#/invoices/new')) {
      return <InvoicePage items={items} customers={customers} business={business} onSave={handleSaveInvoice} />;
    }
    if (hash.startsWith('#/invoices/edit/')) {
        const id = hash.split('/')[3];
        const invoiceToEdit = invoices.find(inv => inv.id === id);
        return <InvoicePage items={items} customers={customers} business={business} onSave={handleSaveInvoice} invoiceToEdit={invoiceToEdit} />;
    }
    if (hash.startsWith('#/invoices')) {
      return <InvoicesListPage invoices={invoices} customers={customers} onDeleteInvoice={handleDeleteInvoice} />;
    }
    if (hash.startsWith('#/customers')) {
      return <CustomersListPage customers={customers} setCustomers={setCustomers} />;
    }
    if (hash.startsWith('#/items')) {
      return <ItemsListPage items={items} setItems={setItems} />;
    }
    if (hash.startsWith('#/settings')) {
      return <SettingsPage business={business} setBusiness={setBusiness} />;
    }
    return <DashboardPage invoices={invoices} customers={customers} />;
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPath={hash} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
