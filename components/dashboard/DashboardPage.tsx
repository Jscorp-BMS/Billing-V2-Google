// Fix: Created DashboardPage.tsx to resolve module not found errors.
import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import StatCard from './StatCard';
import { Invoice, Customer } from '../../types';

interface DashboardPageProps {
  invoices: Invoice[];
  customers: Customer[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ invoices, customers }) => {
    const totalRevenue = invoices
        .filter(inv => inv.status === 'paid' || inv.status === 'partially_paid')
        .reduce((sum, inv) => sum + (inv.total || 0), 0);

    const outstandingTotal = invoices
        .filter(inv => inv.status === 'draft' || inv.status === 'overdue' || inv.status === 'partially_paid')
        .reduce((sum, inv) => sum + (inv.total || 0), 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    return (
        <PageWrapper
            title="Dashboard"
            description="Welcome back! Here's a summary of your business."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                    description="From all paid invoices"
                />
                <StatCard 
                    title="Outstanding"
                    value={formatCurrency(outstandingTotal)}
                    description="Invoices awaiting payment"
                />
                <StatCard 
                    title="Total Invoices"
                    value={invoices.length.toString()}
                    description="Across all statuses"
                />
                <StatCard 
                    title="Active Customers"
                    value={customers.length.toString()}
                    description="All registered customers"
                />
            </div>

            {/* A placeholder for future charts or invoice lists */}
            <div className="mt-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Future section for recent invoices or payments.
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default DashboardPage;
