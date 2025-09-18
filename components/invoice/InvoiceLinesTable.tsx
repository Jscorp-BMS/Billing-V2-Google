import React from 'react';
import { InvoiceLine, Item } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

interface InvoiceLinesTableProps {
  lines: InvoiceLine[];
  dispatch: React.Dispatch<any>;
  items: Item[];
}

const InvoiceLinesTable: React.FC<InvoiceLinesTableProps> = ({ lines, dispatch, items }) => {
    const handleItemSelect = (index: number, itemId: string) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            dispatch({ type: 'UPDATE_LINE', index, field: 'itemId', value: item.id });
            dispatch({ type: 'UPDATE_LINE', index, field: 'description', value: item.description });
            dispatch({ type: 'UPDATE_LINE', index, field: 'unitPrice', value: item.unitPrice });
            dispatch({ type: 'UPDATE_LINE', index, field: 'gstRate', value: item.gstRate });
        }
    };
    
    return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 w-2/5">Item</th>
            <th scope="col" className="px-4 py-3">Qty</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">GST (%)</th>
            <th scope="col" className="px-4 py-3">Total</th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, index) => (
            <tr key={line.id} className="bg-white border-b">
              <td className="px-4 py-2">
                 <select
                    className="block w-full p-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={line.itemId}
                    onChange={(e) => handleItemSelect(index, e.target.value)}
                  >
                    <option value="">Select an item</option>
                    {items.map((item: Item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  value={line.qty}
                  onChange={(e) => dispatch({ type: 'UPDATE_LINE', index, field: 'qty', value: e.target.value })}
                  className="w-16"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  value={line.unitPrice}
                  onChange={(e) => dispatch({ type: 'UPDATE_LINE', index, field: 'unitPrice', value: e.target.value })}
                   className="w-24"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  value={line.gstRate}
                  onChange={(e) => dispatch({ type: 'UPDATE_LINE', index, field: 'gstRate', value: e.target.value })}
                   className="w-20"
                />
              </td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {(line.qty * line.unitPrice * (1 + line.gstRate / 100)).toFixed(2)}
              </td>
              <td className="px-4 py-2">
                <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'REMOVE_LINE', index })}>
                  <Icon name="trash" className="w-4 h-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant="secondary"
        size="sm"
        className="mt-4"
        onClick={() => dispatch({ type: 'ADD_LINE' })}
      >
        <Icon name="plus" className="w-4 h-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};

export default InvoiceLinesTable;
