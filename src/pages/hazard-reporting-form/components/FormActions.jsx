import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSubmit, 
  onSaveDraft, 
  isSubmitting, 
  isSavingDraft, 
  isOnline = true,
  onCancel 
}) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs text-gray-500">
            {isOnline ? 'Online - Report will be submitted immediately' : 'Offline - Report will be saved and submitted when connection is restored'}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="order-3 sm:order-1"
          >
            Cancel
          </Button>
          
          <Button
            variant="outline"
            onClick={onSaveDraft}
            loading={isSavingDraft}
            iconName="Save"
            iconPosition="left"
            className="order-2"
          >
            Save Draft
          </Button>
          
          <Button
            variant="default"
            onClick={onSubmit}
            loading={isSubmitting}
            iconName={isOnline ? "Send" : "Save"}
            iconPosition="left"
            className="order-1 sm:order-3"
          >
            {isOnline ? 'Submit Report' : 'Save for Later'}
          </Button>
        </div>
      </div>
      
      {!isOnline && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-start">
            <Icon name="Wifi" size={16} className="text-amber-600 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-amber-800 font-medium">
                No internet connection
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Your report will be saved locally and automatically submitted when you're back online.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormActions;