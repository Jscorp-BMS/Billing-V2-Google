
import React, { useState } from 'react';
import { Customer } from '../../types';
import PageWrapper from '../layout/PageWrapper';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import ConfirmationModal from '../ui/ConfirmationModal';

interface CustomersListPageProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const initialCustomerState: Customer = {
  id: '',
  name: '',
  email: '',
  billingAddress: '',
  gstin: '',
};

const CustomersListPage: React.FC<CustomersListPageProps> = ({ customers, setCustomers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState<Customer>(initialCustomerState);
    const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
    
    const handleOpenModal = (customer?: Customer) => {
        setEditingCustomer(customer || null);
        setFormData(customer || { ...initialCustomerState, id: `cust_${Date.now()}` });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCustomer(null);
        setFormData(initialCustomerState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === formData.id ? formData : c));
        } else {
            setCustomers([formData, ...customers]);
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        setCustomers(customers.filter(c => c.id !== id));
        setCustomerToDelete(null);
    };
    
    return (
        <PageWrapper
            title="Customers"
            description="Manage your customer profiles."
            actions={
                <Button onClick={() => handleOpenModal()}>
                    <Icon name="plus" className="w-4 h-4 mr-2" />
                    New Customer
                </Button>
            }
        >
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GSTIN</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.gstin}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button onClick={() => handleOpenModal(customer)} title="Edit" className="text-blue-600 hover:text-blue-900">
                                                <Icon name="pencil-square" className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => setCustomerToDelete(customer.id)} title="Delete" className="text-red-600 hover:text-red-900">
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

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCustomer ? 'Edit Customer' : 'Create Customer'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" label="Name" value={formData.name} onChange={handleChange} required />
                    <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
                    <Input name="billingAddress" label="Billing Address" value={formData.billingAddress} onChange={handleChange} />
                    <Input name="gstin" label="GSTIN" value={formData.gstin} onChange={handleChange} />
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit">{editingCustomer ? 'Update Customer' : 'Create Customer'}</Button>
                    </div>
                </form>
            </Modal>
            
             <ConfirmationModal 
                isOpen={!!customerToDelete}
                onClose={() => setCustomerToDelete(null)}
                onConfirm={() => customerToDelete && handleDelete(customerToDelete)}
                title="Delete Customer"
                message="Are you sure you want to delete this customer? This action cannot be undone."
            />
        </PageWrapper>
    );
};

export default CustomersListPage;
