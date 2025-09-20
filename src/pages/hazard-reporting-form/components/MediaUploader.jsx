import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MediaUploader = ({ files, onFilesChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList)?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      url: URL.createObjectURL(file),
      progress: 100
    }));
    
    onFilesChange([...files, ...newFiles]);
  };

  const removeFile = (fileId) => {
    const updatedFiles = files?.filter(f => f?.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Media Attachments
        </label>
        <span className="text-xs text-gray-500">
          {files?.length}/10 files
        </span>
      </div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' :'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFiles(e?.target?.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <Icon name="Upload" size={32} className="mx-auto text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              Photos and videos up to 10MB each
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {files?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {files?.map((file) => (
              <div key={file?.id} className="bg-white border border-gray-200 rounded-lg p-3">
                {file?.type?.startsWith('image/') ? (
                  <div className="aspect-video bg-gray-100 rounded mb-2 overflow-hidden">
                    <Image
                      src={file?.url}
                      alt={file?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <Icon name="Video" size={32} className="text-gray-400" />
                  </div>
                )}
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-900 truncate" title={file?.name}>
                    {file?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file?.size)}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file?.id)}
                  iconName="Trash2"
                  iconSize={14}
                  className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;