import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInfoSection = ({ userInfo, onUpdate }) => {
  const [formData, setFormData] = useState(userInfo);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' },
    { value: 'te', label: 'తెలుగు (Telugu)' },
    { value: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'ml', label: 'മലയാളം (Malayalam)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'or', label: 'ଓଡ଼ିଆ (Odia)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]?[1-9][\d\s\-()]{8,15}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="User" size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          disabled={!isEditing}
          required
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          disabled={!isEditing}
          required
          placeholder="Enter your email address"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
          error={errors?.phoneNumber}
          disabled={!isEditing}
          required
          placeholder="+91 98765 43210"
        />

        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
          disabled={!isEditing}
          placeholder="Select your preferred language"
        />

        <Input
          label="Location"
          type="text"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          disabled={!isEditing}
          placeholder="City, State"
        />

        <Input
          label="Occupation"
          type="text"
          value={formData?.occupation}
          onChange={(e) => handleInputChange('occupation', e?.target?.value)}
          disabled={!isEditing}
          placeholder="Your occupation"
        />
      </div>
      {isEditing && (
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            iconName="X"
            iconPosition="left"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;