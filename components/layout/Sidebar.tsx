// Fix: Created Sidebar.tsx to resolve module not found errors.
import React from 'react';
import Icon from '../ui/Icon';

interface SidebarProps {
  currentPath: string;
}

const navItems = [
  { name: 'Dashboard', href: '#/', icon: 'home' },
  { name: 'Invoices', href: '#/invoices', icon: 'document-duplicate' },
  { name: 'Customers', href: '#/customers', icon: 'users' },
  { name: 'Items', href: '#/items', icon: 'tag' },
  { name: 'Settings', href: '#/settings', icon: 'cog-6-tooth' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
        InvoiceApp
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || (item.href !== '#/' && currentPath.startsWith(item.href));
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon name={item.icon} className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
