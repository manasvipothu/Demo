import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContactInformation = ({ 
  contactInfo, 
  onContactChange, 
  allowContact, 
  onAllowContactChange, 
  errors 
}) => {
  return (
    <div className="space-y-4">
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Contact Information (Optional)
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Allow authorities to contact me for follow-up"
            description="Check this if you're willing to provide additional information if needed"
            checked={allowContact}
            onChange={(e) => onAllowContactChange(e?.target?.checked)}
          />

          {allowContact && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-blue-100">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={contactInfo?.name || ''}
                onChange={(e) => onContactChange({ ...contactInfo, name: e?.target?.value })}
                error={errors?.name}
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={contactInfo?.phone || ''}
                onChange={(e) => onContactChange({ ...contactInfo, phone: e?.target?.value })}
                error={errors?.phone}
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={contactInfo?.email || ''}
                onChange={(e) => onContactChange({ ...contactInfo, email: e?.target?.value })}
                error={errors?.email}
                className="md:col-span-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;