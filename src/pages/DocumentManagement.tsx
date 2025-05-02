import React, { useState } from 'react';
import { Search, Filter, Upload, Plus, FolderOpen, FileText, Download, Eye, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  fileName: string;
  unionCode: string;
  unionName: string;
  folderCode: string;
  folderName: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
}

const DocumentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      fileName: 'AMWU_Constitution_2024.pdf',
      unionCode: 'IO-142',
      unionName: 'Australian Manufacturing Workers Union',
      folderCode: 'IO-142-3',
      folderName: 'Rules and Constitution',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-03-15',
      fileSize: '2.4 MB',
      fileType: 'PDF',
    },
    {
      id: '2',
      fileName: 'HSU_Financial_Returns_2023.xlsx',
      unionCode: 'IO-143',
      unionName: 'Health Services Union',
      folderCode: 'IO-143-7',
      folderName: 'Financial Returns',
      uploadedBy: 'Michael Chen',
      uploadDate: '2024-02-28',
      fileSize: '1.8 MB',
      fileType: 'XLSX',
    },
    {
      id: '3',
      fileName: 'TWU_Membership_List_2024.xlsx',
      unionCode: 'IO-144',
      unionName: 'Transport Workers Union',
      folderCode: 'IO-144-4',
      folderName: 'Financial Membership List',
      uploadedBy: 'Emma Davis',
      uploadDate: '2024-04-05',
      fileSize: '3.2 MB',
      fileType: 'XLSX',
    },
    {
      id: '4',
      fileName: 'FSU_Election_Results_2023.pdf',
      unionCode: 'IO-145',
      unionName: 'Finance Sector Union',
      folderCode: 'IO-145-5',
      folderName: 'Election of Office Bearers',
      uploadedBy: 'James Wilson',
      uploadDate: '2023-11-12',
      fileSize: '1.5 MB',
      fileType: 'PDF',
    },
    {
      id: '5',
      fileName: 'ATU_Registration_Certificate.pdf',
      unionCode: 'IO-146',
      unionName: 'Australian Teachers Union',
      folderCode: 'IO-146-2',
      folderName: 'Registration Certificate',
      uploadedBy: 'Michael Chen',
      uploadDate: '2023-08-12',
      fileSize: '0.8 MB',
      fileType: 'PDF',
    },
  ]);

  const folderTypes = [
    { code: 'all', name: 'All Documents' },
    { code: 'IO-142-0', name: 'General Matters' },
    { code: 'IO-142-1', name: 'Application For Registration' },
    { code: 'IO-142-2', name: 'Registration Certificate' },
    { code: 'IO-142-3', name: 'Rules and Constitution' },
    { code: 'IO-142-4', name: 'Financial Membership List' },
    { code: 'IO-142-5', name: 'Election of Office Bearers' },
    { code: 'IO-142-6', name: 'Secret Ballots' },
    { code: 'IO-142-7', name: 'Financial Returns' },
    { code: 'IO-142-8', name: 'Affiliations' },
    { code: 'IO-142-9', name: 'Inspection Reports' },
    { code: 'IO-142-10', name: 'General Secretary Appointments' },
    { code: 'IO-142-11', name: 'Welfare Funds' },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.unionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.folderName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFolder = selectedFolder === 'all' || doc.folderCode.includes(selectedFolder);
    
    return matchesSearch && matchesFolder;
  });

  const getFileTypeIcon = (fileType: string) => {
    return <FileText className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="space-y-6 pt-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Document Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Store, organize, search, and manage documents in the EDRMS
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <Plus className="mr-2 h-4 w-4" /> Create Folder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folder Structure Sidebar */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Folder Structure</h2>
          <div className="space-y-1">
            {folderTypes.map((folder) => (
              <button
                key={folder.code}
                onClick={() => setSelectedFolder(folder.code)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  selectedFolder === folder.code
                    ? 'bg-primary-light text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FolderOpen
                  className={`mr-2 h-5 w-5 ${
                    selectedFolder === folder.code ? 'text-primary' : 'text-gray-400'
                  }`}
                />
                <span className="truncate">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search documents..."
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              </button>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Document
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Union
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm font-medium text-gray-500"
                      >
                        No documents found matching your search criteria
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getFileTypeIcon(doc.fileType)}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {doc.fileName}
                              </div>
                              <div className="text-xs text-gray-500">
                                Uploaded by: {doc.uploadedBy}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.unionName}</div>
                          <div className="text-xs text-gray-500">{doc.unionCode}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{doc.folderName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.fileSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              className="text-indigo-600 hover:text-indigo-900"
                              title="View document"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-900"
                              title="Download document"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-900"
                              title="Delete document"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{filteredDocuments.length}</span> of{' '}
                  <span className="font-medium">{documents.length}</span> documents
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;