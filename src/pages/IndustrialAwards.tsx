import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, X } from 'lucide-react';

interface Award {
  id: string;
  code: string;
  title: string;
  unionName: string;
  employer: string;
  type: 'MWB' | 'PSCA' | 'TSCA';
  commencementDate: string;
  registrationDate: string;
  duration: string;
  gazetteNumber: string;
  gazetteDate: string;
  status: 'active' | 'expired' | 'draft';
}

interface FilePreview {
  name: string;
  size: string;
}

const IndustrialAwards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnion, setSelectedUnion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateSort, setDateSort] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  
  const [awards] = useState<Award[]>([
    {
      id: '1',
      code: 'AW-2023-001',
      title: 'Manufacturing Industry Minimum Wage Award 2023',
      unionName: 'Australian Manufacturing Workers Union',
      employer: 'National Manufacturing Association',
      type: 'MWB',
      commencementDate: '2023-01-01',
      registrationDate: '2022-11-15',
      duration: '3 years',
      gazetteNumber: 'G12345',
      gazetteDate: '2022-12-10',
      status: 'active'
    },
    {
      id: '2',
      code: 'AW-2023-002',
      title: 'Public Health Sector Award 2023',
      unionName: 'Health Services Union',
      employer: 'Department of Health',
      type: 'PSCA',
      commencementDate: '2023-02-01',
      registrationDate: '2023-01-10',
      duration: '2 years',
      gazetteNumber: 'G12346',
      gazetteDate: '2023-01-25',
      status: 'active'
    },
    {
      id: '3',
      code: 'AW-2023-003',
      title: 'Transport Workers Collective Agreement 2023',
      unionName: 'Transport Workers Union',
      employer: 'National Transport Federation',
      type: 'MWB',
      commencementDate: '2023-03-15',
      registrationDate: '2023-02-28',
      duration: '4 years',
      gazetteNumber: 'G12347',
      gazetteDate: '2023-03-10',
      status: 'active'
    },
    {
      id: '4',
      code: 'AW-2022-004',
      title: 'Financial Services Award 2022',
      unionName: 'Finance Sector Union',
      employer: 'Banking Council',
      type: 'PSCA',
      commencementDate: '2022-07-01',
      registrationDate: '2022-05-15',
      duration: '2 years',
      gazetteNumber: 'G12222',
      gazetteDate: '2022-06-20',
      status: 'expired'
    },
    {
      id: '5',
      code: 'AW-2023-005',
      title: 'Teachers Employment Conditions Award 2023',
      unionName: 'Australian Teachers Union',
      employer: 'Department of Education',
      type: 'TSCA',
      commencementDate: '2023-04-01',
      registrationDate: '2023-03-15',
      duration: '3 years',
      gazetteNumber: 'G12348',
      gazetteDate: '2023-03-25',
      status: 'active'
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      const newPreviews = newFiles.map(file => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      }));
      setFilePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    
    setFilePreviews(prevPreviews => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  const filteredAwards = awards.filter(
    (award) =>
      award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.unionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.employer.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(
    (award) => selectedUnion === '' || award.unionName === selectedUnion
  ).filter(
    (award) => selectedType === '' || award.type === selectedType
  ).sort((a, b) => {
    if (dateSort === 'newest') {
      return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
    } else if (dateSort === 'oldest') {
      return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'MWB':
        return 'Minimum Wages Board Determination Award';
      case 'PSCA':
        return 'Public Service Conciliation and Arbitration Determination Award';
      case 'TSCA':
        return 'Teaching Service Conciliation & Arbitrated Act Determinations';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 pt-6 pb-8">
      {/* Header and Search/Filters (unchanged) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Industrial Awards Registry</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view all registered industrial awards
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="mr-2 h-4 w-4" /> Register New Award
          </button>
        </div>
      </div>

      {/* Search and Filter (unchanged) */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search awards..."
            />
          </div>
          <div>
            <select 
              value={selectedUnion}
              onChange={(e) => setSelectedUnion(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">All Unions</option>
              <option value="Australian Manufacturing Workers Union">AMWU</option>
              <option value="Health Services Union">HSU</option>
              <option value="Transport Workers Union">TWU</option>
              <option value="Finance Sector Union">FSU</option>
              <option value="Australian Teachers Union">ATU</option>
            </select>
          </div>
          <div>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">All Award Types</option>
              <option value="MWB">Minimum Wages Board</option>
              <option value="PSCA">Public Service Conciliation</option>
              <option value="TSCA">Teaching Service</option>
            </select>
          </div>
          <div>
            <select 
              value={dateSort}
              onChange={(e) => setDateSort(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">Registration Date</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Awards Table (unchanged) */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Award Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Union Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commencement Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gazette #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gazette Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAwards.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                    No awards found matching your search criteria
                  </td>
                </tr>
              ) : (
                filteredAwards.map((award) => (
                  <tr key={award.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {award.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{award.title}</div>
                      <div className="text-xs text-gray-500">{getTypeName(award.type)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {award.unionName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(award.commencementDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(award.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {award.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {award.gazetteNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(award.gazetteDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900"
                          title="Download documents"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
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
              <span className="font-medium">{filteredAwards.length}</span> of{' '}
              <span className="font-medium">{awards.length}</span> awards
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

      {/* Registration Modal with updated file upload */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Register New Industrial Award</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="award-title" className="block text-sm font-medium text-gray-700">
                      Award Title
                    </label>
                    <input
                      type="text"
                      name="award-title"
                      id="award-title"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="award-code" className="block text-sm font-medium text-gray-700">
                      Award Code
                    </label>
                    <input
                      type="text"
                      name="award-code"
                      id="award-code"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="union-name" className="block text-sm font-medium text-gray-700">
                      Union Name
                    </label>
                    <select
                      id="union-name"
                      name="union-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">Select Union</option>
                      <option value="Australian Manufacturing Workers Union">AMWU</option>
                      <option value="Health Services Union">HSU</option>
                      <option value="Transport Workers Union">TWU</option>
                      <option value="Finance Sector Union">FSU</option>
                      <option value="Australian Teachers Union">ATU</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="employer" className="block text-sm font-medium text-gray-700">
                      Employer
                    </label>
                    <input
                      type="text"
                      name="employer"
                      id="employer"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="award-type" className="block text-sm font-medium text-gray-700">
                      Award Type
                    </label>
                    <select
                      id="award-type"
                      name="award-type"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">Select Award Type</option>
                      <option value="MWB">Minimum Wages Board Determination Award</option>
                      <option value="PSCA">Public Service Conciliation and Arbitration Determination Award</option>
                      <option value="TSCA">Teaching Service Conciliation & Arbitrated Act Determinations</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">Select Duration</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="4 years">4 years</option>
                      <option value="5 years">5 years</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="commencement-date" className="block text-sm font-medium text-gray-700">
                      Commencement Date
                    </label>
                    <input
                      type="date"
                      name="commencement-date"
                      id="commencement-date"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="registration-date" className="block text-sm font-medium text-gray-700">
                      Registration Date
                    </label>
                    <input
                      type="date"
                      name="registration-date"
                      id="registration-date"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="gazette-date" className="block text-sm font-medium text-gray-700">
                      Gazette Date
                    </label>
                    <input
                      type="date"
                      name="gazette-date"
                      id="gazette-date"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="gazette-number" className="block text-sm font-medium text-gray-700">
                      Gazette Number
                    </label>
                    <input
                      type="text"
                      name="gazette-number"
                      id="gazette-number"
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                          >
                            <span>Upload files</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only" 
                              multiple
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 10MB each
                        </p>
                      </div>
                    </div>
                    
                    {/* File preview section */}
                    {filePreviews.length > 0 && (
                      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {filePreviews.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center truncate">
                              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                              <div className="ml-2 truncate">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-2 text-red-600 hover:text-red-900"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                >
                  Register Award
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrialAwards;