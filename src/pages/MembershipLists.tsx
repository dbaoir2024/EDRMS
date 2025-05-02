import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, X } from 'lucide-react';
import type { Member } from '../types';

const MembershipLists: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      unionId: 'IO-142',
      name: 'John Smith',
      employeeId: 'EMP001',
      position: 'Senior Engineer',
      joiningDate: '2023-01-15',
      status: 'active'
    },
    {
      id: '2',
      unionId: 'IO-142',
      name: 'Sarah Johnson',
      employeeId: 'EMP002',
      position: 'Project Manager',
      joiningDate: '2023-02-20',
      status: 'active'
    },
    {
      id: '3',
      unionId: 'IO-143',
      name: 'Michael Brown',
      employeeId: 'EMP003',
      position: 'Healthcare Worker',
      joiningDate: '2023-03-10',
      status: 'active'
    },
    {
      id: '4',
      unionId: 'IO-144',
      name: 'Emily Davis',
      employeeId: 'EMP004',
      position: 'Transport Officer',
      joiningDate: '2023-04-05',
      status: 'inactive'
    },
    {
      id: '5',
      unionId: 'IO-145',
      name: 'David Wilson',
      employeeId: 'EMP005',
      position: 'Financial Analyst',
      joiningDate: '2023-05-15',
      status: 'active'
    }
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMembers, setNewMembers] = useState<Partial<Member>[]>([]);
  const [currentMember, setCurrentMember] = useState<Partial<Member>>({
    unionId: '',
    name: '',
    employeeId: '',
    position: '',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = () => {
    if (
      !currentMember.name ||
      !currentMember.employeeId ||
      !currentMember.position ||
      !currentMember.unionId
    ) {
      alert('Please fill all required fields');
      return;
    }

    setNewMembers([...newMembers, currentMember]);
    setCurrentMember({
      unionId: currentMember.unionId, // Keep the same union for batch additions
      name: '',
      employeeId: '',
      position: '',
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
  };

  const handleSubmitForReview = async () => {
    if (newMembers.length === 0) {
      alert('Please add at least one member before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to submit for review
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send to your backend which would notify the reviewers
      console.log('Submitted for review:', newMembers);
      
      setSubmissionStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setNewMembers([]);
        setSubmissionStatus('idle');
        // In a real app, you would likely refresh the members list from the server
      }, 2000);
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeNewMember = (index: number) => {
    const updatedMembers = [...newMembers];
    updatedMembers.splice(index, 1);
    setNewMembers(updatedMembers);
  };

  return (
    <div className="space-y-6 pt-6 pb-8">
      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New Financial Members</h2>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewMembers([]);
                    setSubmissionStatus('idle');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {submissionStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Submission Successful</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          The new members have been submitted for review. The Industrial Registrar and General Secretary have been notified and will review your submission.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : submissionStatus === 'error' ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Submission Failed</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          There was an error submitting the new members. Please try again or contact support if the problem persists.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                    <div>
                      <label htmlFor="unionId" className="block text-sm font-medium text-gray-700 mb-1">
                        Union ID <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="unionId"
                        value={currentMember.unionId}
                        onChange={(e) => setCurrentMember({...currentMember, unionId: e.target.value})}
                        className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      >
                        <option value="">Select Union</option>
                        <option value="IO-142">AMWU (IO-142)</option>
                        <option value="IO-143">HSU (IO-143)</option>
                        <option value="IO-144">TWU (IO-144)</option>
                        <option value="IO-145">FSU (IO-145)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeId"
                        value={currentMember.employeeId}
                        onChange={(e) => setCurrentMember({...currentMember, employeeId: e.target.value})}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="EMP123"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={currentMember.name}
                        onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="position"
                        value={currentMember.position}
                        onChange={(e) => setCurrentMember({...currentMember, position: e.target.value})}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Senior Engineer"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        id="joiningDate"
                        value={currentMember.joiningDate}
                        onChange={(e) => setCurrentMember({...currentMember, joiningDate: e.target.value})}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleAddMember}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add to List
                      </button>
                    </div>
                  </div>

                  {/* Members to be submitted */}
                  {newMembers.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Members to be Submitted</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Employee ID
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Name
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Position
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Union
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Joining Date
                                </th>
                                <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {newMembers.map((member, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {member.employeeId}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {member.name}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {member.position}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {member.unionId}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {member.joiningDate}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                      onClick={() => removeNewMember(index)}
                                      className="text-red-600 hover:text-red-900"
                                      title="Remove"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Review Process</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            After submission, these new members will be reviewed by the Industrial Registrar and the General Secretary of the respective union. You will be notified once the review is complete.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setNewMembers([]);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitForReview}
                      disabled={isSubmitting || newMembers.length === 0}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rest of the component remains the same */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Membership Lists</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view union membership records
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Member
          </button>
        </div>
      </div>

      {/* Search and Filter */}
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
              placeholder="Search members..."
            />
          </div>
          <div>
            <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
              <option value="">All Unions</option>
              <option value="IO-142">AMWU</option>
              <option value="IO-143">HSU</option>
              <option value="IO-144">TWU</option>
              <option value="IO-145">FSU</option>
            </select>
          </div>
          <div>
            <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending Review</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Union ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joining Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No members found matching your search criteria
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.unionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button type="button" className="text-indigo-600 hover:text-indigo-900" title="View details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button type="button" className="text-blue-600 hover:text-blue-900" title="Download records">
                          <Download className="h-4 w-4" />
                        </button>
                        <button type="button" className="text-green-600 hover:text-green-900" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button type="button" className="text-red-600 hover:text-red-900" title="Delete">
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
              <span className="font-medium">{filteredMembers.length}</span> of{' '}
              <span className="font-medium">{members.length}</span> members
            </div>
            <div className="flex space-x-2">
              <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipLists;