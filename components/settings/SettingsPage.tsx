import React, { useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Business } from '../../types';

interface SettingsPageProps {
  business: Business;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ business, setBusiness }) => {
    const [formData, setFormData] = useState<Business>(business);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBusiness(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    }

    return (
        <PageWrapper
            title="Settings"
            description="Manage your business profile and application settings."
        >
            <Card>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                    <Input 
                        label="Business Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input 
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                     <Input 
                        label="Phone"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Input 
                        label="Address"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                     <Input 
                        label="GSTIN"
                        id="gstin"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                    />
                    <div className="flex items-center space-x-4">
                        <Button type="submit">Save Changes</Button>
                        {isSaved && <span className="text-sm text-green-600">Settings saved successfully!</span>}
                    </div>
                </form>
            </Card>
        </PageWrapper>
    );
};

export default SettingsPage;
