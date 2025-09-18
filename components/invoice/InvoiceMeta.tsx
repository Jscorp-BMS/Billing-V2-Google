
import React from 'react';
import { Invoice } from '../../types';
import Input from '../ui/Input';

interface InvoiceMetaProps {
  invoice: Invoice;
  dispatch: React.Dispatch<any>;
}

const InvoiceMeta: React.FC<InvoiceMetaProps> = ({ invoice, dispatch }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Invoice Number"
        id="invoiceNumber"
        type="text"
        value={invoice.invoiceNumber}
        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'invoiceNumber', value: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Invoice Date"
          id="invoiceDate"
          type="date"
          value={invoice.date}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'date', value: e.target.value })}
        />
        <Input
          label="Due Date"
          id="dueDate"
          type="date"
          value={invoice.dueDate}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'dueDate', value: e.target.value })}
        />
      </div>
    </div>
  );
};

export default InvoiceMeta;
