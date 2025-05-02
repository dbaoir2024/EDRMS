// src/components/ui/file-upload.tsx
import * as React from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onDrop: (file: FileWithPath) => void;
  className?: string;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, maxSize, onDrop, className }, ref) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: accept ? { [accept]: [] } : undefined,
      maxSize,
      maxFiles: 1,
      onDrop: acceptedFiles => {
        if (acceptedFiles.length > 0) {
          onDrop(acceptedFiles[0]);
        }
      },
    });

    return (
      <div
        {...getRootProps()}
        ref={ref}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer',
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
          className
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="h-8 w-8 text-gray-400" />
          <p className="text-sm">
            {isDragActive
              ? 'Drop the file here'
              : 'Drag & drop a file here, or click to select'}
          </p>
          <p className="text-xs text-gray-500">
            {accept && `Accepted file type: ${accept}`}
            {maxSize && ` • Max file size: ${maxSize / 1_000_000}MB`}
          </p>
        </div>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';