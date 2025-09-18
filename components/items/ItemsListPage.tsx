
import React, { useState } from 'react';
import { Item } from '../../types';
import PageWrapper from '../layout/PageWrapper';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import ConfirmationModal from '../ui/ConfirmationModal';

interface ItemsListPageProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const initialItemState: Item = {
  id: '',
  sku: '',
  name: '',
  description: '',
  unitPrice: 0,
  gstRate: 0,
};

const ItemsListPage: React.FC<ItemsListPageProps> = ({ items, setItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [formData, setFormData] = useState<Item>(initialItemState);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const handleOpenModal = (item?: Item) => {
        setEditingItem(item || null);
        setFormData(item || { ...initialItemState, id: `item_${Date.now()}` });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData(initialItemState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const isNumeric = name === 'unitPrice' || name === 'gstRate';
        setFormData(prev => ({ ...prev, [name]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            setItems(items.map(i => i.id === formData.id ? formData : i));
        } else {
            setItems([formData, ...items]);
        }
        handleCloseModal();
    };
    
    const handleDelete = (id: string) => {
        setItems(items.filter(i => i.id !== id));
        setItemToDelete(null);
    }
    
    return (
        <PageWrapper
            title="Items"
            description="Manage your products and services."
            actions={
                <Button onClick={() => handleOpenModal()}>
                    <Icon name="plus" className="w-4 h-4 mr-2" />
                    New Item
                </Button>
            }
        >
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST (%)</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unitPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gstRate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                       <div className="flex items-center justify-end space-x-2">
                                            <button onClick={() => handleOpenModal(item)} title="Edit" className="text-blue-600 hover:text-blue-900">
                                                <Icon name="pencil-square" className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => setItemToDelete(item.id)} title="Delete" className="text-red-600 hover:text-red-900">
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

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingItem ? 'Edit Item' : 'Create Item'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="sku" label="SKU" value={formData.sku} onChange={handleChange} required />
                    <Input name="name" label="Name" value={formData.name} onChange={handleChange} required />
                    <Input name="description" label="Description" value={formData.description} onChange={handleChange} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="unitPrice" label="Unit Price" type="number" step="0.01" value={formData.unitPrice} onChange={handleChange} required />
                        <Input name="gstRate" label="GST Rate (%)" type="number" step="0.01" value={formData.gstRate} onChange={handleChange} required />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit">{editingItem ? 'Update Item' : 'Create Item'}</Button>
                    </div>
                </form>
            </Modal>
            
            <ConfirmationModal 
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={() => itemToDelete && handleDelete(itemToDelete)}
                title="Delete Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
            />
        </PageWrapper>
    );
};

export default ItemsListPage;
