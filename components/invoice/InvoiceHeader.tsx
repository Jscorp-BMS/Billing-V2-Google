import React from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

interface InvoiceHeaderProps {
    isEditing: boolean;
    onSave: () => void;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ isEditing, onSave }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{isEditing ? 'Edit Invoice' : 'New Invoice'}</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {isEditing ? 'Update the details of the existing invoice.' : 'Fill out the details below to create a new invoice.'}
                </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button variant="secondary" onClick={() => window.location.hash = '#/invoices'}>Cancel</Button>
                <Button variant="secondary" onClick={handlePrint}>
                    <Icon name="print" className="w-4 h-4 mr-2" />
                    Print / PDF
                </Button>
                <Button onClick={onSave}>
                    {isEditing ? (
                        <>
                            <Icon name="pencil-square" className="w-4 h-4 mr-2" />
                            Update Invoice
                        </>
                    ) : (
                        <>
                            <Icon name="share" className="w-4 h-4 mr-2" />
                            Share & Send
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default InvoiceHeader;