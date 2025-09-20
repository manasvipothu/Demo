import React from 'react';
import Select from '../../../components/ui/Select';

const SeveritySelector = ({ value, onChange, error }) => {
  const severityLevels = [
    { 
      value: 'low', 
      label: 'Low', 
      description: 'Minor hazard with minimal immediate impact' 
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Moderate hazard requiring attention' 
    },
    { 
      value: 'high', 
      label: 'High', 
      description: 'Serious hazard with significant impact' 
    },
    { 
      value: 'critical', 
      label: 'Critical', 
      description: 'Immediate danger requiring urgent response' 
    }
  ];

  return (
    <div className="space-y-2">
      <Select
        label="Severity Level"
        description="Assess the severity of the reported hazard"
        placeholder="Select severity level..."
        options={severityLevels}
        value={value}
        onChange={onChange}
        error={error}
        required
        className="w-full"
      />
    </div>
  );
};

export default SeveritySelector;