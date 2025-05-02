// src/components/documents/UploadForm.tsx
import { useFormContext } from 'react-hook-form';
import { FolderTree, FileType, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const FOLDER_STRUCTURE = [
  { 
    code: 'IO-142-0',
    name: 'General Matters',
    allowedTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png']
  },
  { 
    code: 'IO-142-1',
    name: 'Application For Registration',
    allowedTypes: ['pdf', 'doc', 'docx']
  },
  { 
    code: 'IO-142-2',
    name: 'Registration Certificate',
    allowedTypes: ['pdf', 'jpg', 'png']
  },
  // ... other folders as per your structure
  {
    code: 'IO-142-11',
    name: 'Welfare Funds',
    allowedTypes: ['pdf', 'xls', 'xlsx', 'doc', 'docx']
  }
];

const CASE_TYPES = [
  'Correspondence',
  'Union Award',
  'Agreement',
  'Instrument',
  'Gazettal Notice',
  'Case File',
  'Inspection Report'
];

export const DocumentUploadForm = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const toggleFolder = (folderCode: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderCode)
        ? prev.filter(code => code !== folderCode)
        : [...prev, folderCode]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue('file', e.target.files[0]);
      // Auto-detect file type
      const extension = e.target.files[0].name.split('.').pop()?.toLowerCase();
      setValue('fileType', extension || 'unknown');
    }
  };

  const selectedFolderData = FOLDER_STRUCTURE.find(f => f.code === selectedFolder);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Folder Selection */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center">
            <FolderTree className="mr-2 h-5 w-5" />
            Select Destination Folder
          </h3>
          <div className="space-y-1">
            {FOLDER_STRUCTURE.map(folder => (
              <div key={folder.code} className="space-y-1">
                <div
                  className={`flex items-center p-2 rounded-md cursor-pointer ${selectedFolder === folder.code ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => {
                    setSelectedFolder(folder.code);
                    setValue('folder', folder.code);
                  }}
                >
                  {expandedFolders.includes(folder.code) ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  <span className="font-mono text-sm mr-2">{folder.code}</span>
                  <span>{folder.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - File Details */}
        <div className="space-y-4">
          {selectedFolder && (
            <>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Selected Folder</h3>
                <p className="font-mono text-sm">{selectedFolder}</p>
                <p className="text-sm text-gray-600">{selectedFolderData?.name}</p>
                <p className="text-xs mt-2 text-gray-500">
                  Allowed file types: {selectedFolderData?.allowedTypes.join(', ')}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Document Type
                  </label>
                  <select
                    {...register('documentType')}
                    className="w-full border rounded-md p-2 text-sm"
                  >
                    <option value="">Select document type</option>
                    {CASE_TYPES.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.documentType && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.documentType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Case/Union Reference
                  </label>
                  <input
                    type="text"
                    {...register('reference')}
                    placeholder="e.g. Case #1234 or Union Name"
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full border rounded-md p-2 text-sm"
                    placeholder="Enter document description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept={selectedFolderData?.allowedTypes.map(t => `.${t}`).join(',')}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                    >
                      <FileType className="h-8 w-8 text-gray-400" />
                      <p className="text-sm">
                        {watch('file')?.name || 'Click to select file'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Max file size: 10MB • Allowed: {selectedFolderData?.allowedTypes.join(', ')}
                      </p>
                    </label>
                  </div>
                  {errors.file && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.file.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {!selectedFolder && (
            <div className="border rounded-lg p-8 text-center">
              <AlertCircle className="h-10 w-10 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Please select a destination folder from the list
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          className="px-4 py-2 border rounded-md text-sm"
          onClick={() => setSelectedFolder(null)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!selectedFolder || !watch('file')}
          className={`px-4 py-2 rounded-md text-sm text-white ${!selectedFolder || !watch('file') ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Upload Document
        </button>
      </div>
    </div>
  );
};