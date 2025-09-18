// Fix: Created StatCard.tsx to resolve module not found errors.
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
    );
};

export default StatCard;
