import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePhotoUpload = ({ currentPhoto, onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Validate file type
      if (!file?.type?.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file?.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e?.target?.result);
        setCropMode(true);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      onUpdate({
        type: 'profilePhoto',
        data: {
          url: previewUrl,
          filename: selectedImage?.name,
          size: selectedImage?.size
        }
      });
      setCropMode(false);
      setIsUploading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewUrl(currentPhoto);
    setCropMode(false);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setSelectedImage(null);
    setCropMode(false);
    onUpdate({
      type: 'profilePhoto',
      data: { url: null }
    });
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Camera" size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Profile Photo</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Current Photo Display */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <Icon name="User" size={48} className="text-blue-600" />
                </div>
              )}
            </div>
            
            {cropMode && (
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500 bg-blue-500 bg-opacity-10 flex items-center justify-center">
                <Icon name="Crop" size={24} className="text-blue-600" />
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-3 text-center">
            {cropMode ? 'Preview - Ready to upload' : 'Current profile photo'}
          </p>
        </div>

        {/* Upload Controls */}
        <div className="flex-1">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Photo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose a clear photo of yourself. JPG, PNG or GIF format. Maximum file size: 5MB.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!cropMode ? (
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="default"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={() => fileInputRef?.current?.click()}
                >
                  Choose Photo
                </Button>
                
                {previewUrl && (
                  <Button
                    variant="outline"
                    iconName="Trash2"
                    iconPosition="left"
                    onClick={handleRemovePhoto}
                  >
                    Remove Photo
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Photo Ready</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        Your new profile photo is ready to upload. The image will be automatically cropped to fit a circular frame.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="default"
                    iconName="Check"
                    iconPosition="left"
                    loading={isUploading}
                    onClick={handleUpload}
                  >
                    {isUploading ? 'Uploading...' : 'Save Photo'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    iconName="X"
                    iconPosition="left"
                    onClick={handleCancel}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => fileInputRef?.current?.click()}
                    disabled={isUploading}
                  >
                    Choose Different
                  </Button>
                </div>
              </div>
            )}

            {/* Photo Guidelines */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Photo Guidelines</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Use a clear, recent photo of yourself
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Face should be clearly visible and centered
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Good lighting and high contrast
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="X" size={16} className="text-red-600" />
                  No group photos or multiple people
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="X" size={16} className="text-red-600" />
                  Avoid sunglasses or face coverings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;