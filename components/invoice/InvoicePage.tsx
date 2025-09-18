import React from 'react';
import InvoiceHeader from './InvoiceHeader';
import CustomerSelector from './CustomerSelector';
import InvoiceMeta from './InvoiceMeta';
import InvoiceLinesTable from './InvoiceLinesTable';
import InvoiceTotals from './InvoiceTotals';
import InvoicePreview from './InvoicePreview';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { useInvoice } from '../../hooks/useInvoice';
import { generateInvoiceNote } from '../../services/geminiService';
import { Item, Customer, Business, Invoice } from '../../types';

interface InvoicePageProps {
    items: Item[];
    customers: Customer[];
    business: Business;
    onSave: (invoice: Invoice) => void;
    invoiceToEdit?: Invoice | null;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ items, customers, business, onSave, invoiceToEdit }) => {
    const { invoice, dispatch, subtotal, taxTotal, total } = useInvoice(invoiceToEdit);
    const [isAiNoteLoading, setIsAiNoteLoading] = React.useState(false);

    const handleGenerateNote = async () => {
        setIsAiNoteLoading(true);
        const customer = customers.find(c => c.id === invoice.customerId);
        const note = await generateInvoiceNote(invoice, customer, business);
        dispatch({ type: 'SET_NOTES', notes: note });
        setIsAiNoteLoading(false);
    };
    
    const handleSave = () => {
        onSave(invoice);
        window.location.hash = '#/invoices';
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <InvoiceHeader isEditing={!!invoiceToEdit} onSave={handleSave} />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
                <div className="lg:col-span-3 space-y-6">
                    <Card title="Customer & Invoice Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CustomerSelector 
                                selectedCustomerId={invoice.customerId}
                                onSelectCustomer={(id) => dispatch({ type: 'SET_CUSTOMER', customerId: id })}
                                customers={customers}
                            />
                            <InvoiceMeta invoice={invoice} dispatch={dispatch} />
                        </div>
                    </Card>
                    <Card title="Items">
                        <InvoiceLinesTable lines={invoice.lines} dispatch={dispatch} items={items} />
                    </Card>
                    <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes / Terms</label>
                                <textarea
                                    id="notes"
                                    rows={4}
                                    className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={invoice.notes}
                                    onChange={(e) => dispatch({ type: 'SET_NOTES', notes: e.target.value })}
                                ></textarea>
                                <Button size="sm" variant="ghost" className="mt-2" onClick={handleGenerateNote} disabled={isAiNoteLoading}>
                                    <Icon name="sparkles" className="w-4 h-4 mr-2" />
                                    {isAiNoteLoading ? 'Generating...' : 'AI Suggestion'}
                                </Button>
                            </div>
                            <InvoiceTotals subtotal={subtotal} taxTotal={taxTotal} total={total} />
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <div className="sticky top-8">
                        <InvoicePreview invoice={invoice} business={business} customers={customers} items={items} subtotal={subtotal} taxTotal={taxTotal} total={total} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;