import React from 'react';
import Input from '../../../components/ui/Input';

const IncidentDetails = ({ description, incidentTime, onDescriptionChange, onTimeChange, errors }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now?.getFullYear();
    const month = String(now?.getMonth() + 1)?.padStart(2, '0');
    const day = String(now?.getDate())?.padStart(2, '0');
    const hours = String(now?.getHours())?.padStart(2, '0');
    const minutes = String(now?.getMinutes())?.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Incident Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e?.target?.value)}
          placeholder="Provide a detailed description of the ocean hazard you observed. Include what you saw, when it occurred, and any other relevant details..."
          rows={6}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
            errors?.description ? 'border-red-300' : 'border-gray-300'
          }`}
          required
        />
        {errors?.description && (
          <p className="mt-1 text-sm text-red-600">{errors?.description}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Minimum 20 characters required. Be as specific as possible.
        </p>
      </div>
      <Input
        label="Time of Incident"
        type="datetime-local"
        value={incidentTime}
        onChange={(e) => onTimeChange(e?.target?.value)}
        max={getCurrentDateTime()}
        error={errors?.incidentTime}
        required
        description="When did you observe this hazard?"
      />
    </div>
  );
};

export default IncidentDetails;