
import React, { useState } from 'react';
import { Invoice, Customer } from '../../types';
import PageWrapper from '../layout/PageWrapper';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import ConfirmationModal from '../ui/ConfirmationModal';

interface InvoicesListPageProps {
  invoices: Invoice[];
  customers: Customer[];
  onDeleteInvoice: (invoiceId: string) => void;
}

const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
        case 'paid':
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span>;
        case 'partially_paid':
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Partially Paid</span>;
        case 'overdue':
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Overdue</span>;
        case 'draft':
        default:
            return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
    }
};

const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

const InvoicesListPage: React.FC<InvoicesListPageProps> = ({ invoices, customers, onDeleteInvoice }) => {
    const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

    const getCustomerName = (customerId: string | null) => {
        return customers.find(c => c.id === customerId)?.name || 'N/A';
    };
    
    const handleDeleteConfirm = () => {
        if (invoiceToDelete) {
            onDeleteInvoice(invoiceToDelete);
            setInvoiceToDelete(null);
        }
    };

    return (
        <PageWrapper
            title="Invoices"
            description="Manage all your existing invoices or create a new one."
            actions={
                <Button onClick={() => window.location.hash = '#/invoices/new'}>
                    <Icon name="plus" className="w-4 h-4 mr-2" />
                    New Invoice
                </Button>
            }
        >
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getCustomerName(invoice.customerId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(invoice.total)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(invoice.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <a href={`#/invoices/edit/${invoice.id}`} title="Edit" className="text-blue-600 hover:text-blue-900">
                                                <Icon name="pencil-square" className="w-5 h-5" />
                                            </a>
                                            <button onClick={() => setInvoiceToDelete(invoice.id)} title="Delete" className="text-red-600 hover:text-red-900">
                                                <Icon name="trash" className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <ConfirmationModal 
                isOpen={!!invoiceToDelete}
                onClose={() => setInvoiceToDelete(null)}
                onConfirm={handleDeleteConfirm}
                title="Delete Invoice"
                message="Are you sure you want to delete this invoice? This action cannot be undone."
            />
        </PageWrapper>
    );
};

export default InvoicesListPage;
