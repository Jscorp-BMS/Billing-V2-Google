import React from 'react';

interface PageWrapperProps {
    title: string;
    description: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, description, actions, children }) => {
    return (
        <div className="p-4 md:p-8 h-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                {actions && (
                    <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        {actions}
                    </div>
                )}
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
