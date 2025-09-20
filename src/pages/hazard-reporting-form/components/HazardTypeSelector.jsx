import React from 'react';
import Select from '../../../components/ui/Select';

const HazardTypeSelector = ({ value, onChange, error }) => {
  const hazardTypes = [
    { value: 'oil-spill', label: 'Oil Spill', description: 'Petroleum or chemical contamination' },
    { value: 'marine-debris', label: 'Marine Debris', description: 'Floating waste or garbage' },
    { value: 'algal-bloom', label: 'Algal Bloom', description: 'Harmful algae concentration' },
    { value: 'dead-marine-life', label: 'Dead Marine Life', description: 'Fish kills or marine animal deaths' },
    { value: 'coastal-erosion', label: 'Coastal Erosion', description: 'Beach or cliff erosion' },
    { value: 'water-discoloration', label: 'Water Discoloration', description: 'Unusual water color changes' },
    { value: 'chemical-discharge', label: 'Chemical Discharge', description: 'Industrial or sewage discharge' },
    { value: 'navigation-hazard', label: 'Navigation Hazard', description: 'Obstacles or dangerous conditions' },
    { value: 'weather-related', label: 'Weather Related', description: 'Storm damage or extreme weather' },
    { value: 'other', label: 'Other', description: 'Other ocean hazards not listed' }
  ];

  return (
    <div className="space-y-2">
      <Select
        label="Hazard Type"
        description="Select the type of ocean hazard you are reporting"
        placeholder="Choose hazard type..."
        options={hazardTypes}
        value={value}
        onChange={onChange}
        error={error}
        required
        searchable
        className="w-full"
      />
    </div>
  );
};

export default HazardTypeSelector;