import React, { useState } from 'react';
import { 
  Plus, Search, Filter, ArrowRight, Users, FileCheck, Clock, 
  Gavel, Scale, BookOpen, Shield, AlertCircle, CheckCircle2, 
  XCircle, CalendarCheck, FileText, Database, Briefcase, Mail, 
  FileArchive, FileInput, FileOutput, ChevronDown, ChevronUp
} from 'lucide-react';

interface Correspondence {
  id: string;
  dateReceived: Date;
  from: string;
  subject: string;
  documentDate: Date;
  referredTo: string;
  dateOut: Date | null;
  comments: string;
  status: 'pending' | 'processed' | 'archived';
  relatedWorkflowId?: number;
  documents: {
    name: string;
    type: string;
    url: string;
    dateUploaded: Date;
  }[];
}

interface Workflow {
  id: number;
  name: string;
  type: string;
  category: string;
  status: string;
  progress: number;
  assigned: string[];
  dueDate: string;
  priority: string;
  notes: string;
  correspondence?: Correspondence[];
}

const Workflows = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCorrespondence, setShowCorrespondence] = useState<number | null>(null);
  
  // Main workflow categories
  const workflowCategories = [
    { id: 'all', name: 'All Workflows' },
    { id: 'registrations', name: 'Registrations' },
    { id: 'tribunal', name: 'Tribunal Determinations' },
    { id: 'unions', name: 'Union Elections' },
    { id: 'strikes', name: 'Strike Interventions' },
    { id: 'legal', name: 'Legal Matters' },
    { id: 'policy', name: 'Policy Work' }
  ];

  // Status filters
  const statusFilters = [
    { id: 'all', name: 'All Statuses' },
    { id: 'processed', name: 'Processed & Cleared' },
    { id: 'returned', name: 'Returned for Correction' },
    { id: 'pending', name: 'Pending NEC Consideration' },
    { id: 'rejected', name: 'Rejected' },
    { id: 'completed', name: 'Completed' }
  ];

  // Sample correspondence data
  const sampleCorrespondence: Correspondence[] = [
    {
      id: 'corr-1',
      dateReceived: new Date('2025-01-06'),
      from: 'Beverley Doiwa, Chairman – Office of Industrial Conciliation & Arbitration & MWB',
      subject: 'Registration and safekeeping of four (4) ADHOC Tribunal Decisions',
      documentDate: new Date('2024-11-06'),
      referredTo: '',
      dateOut: null,
      comments: '',
      status: 'processed',
      relatedWorkflowId: 3,
      documents: [
        {
          name: 'Eddy Yaman vs Air Niugini Limited',
          type: 'Tribunal Decision',
          url: '#',
          dateUploaded: new Date('2025-01-06')
        }
      ]
    },
    {
      id: 'corr-2',
      dateReceived: new Date('2025-01-06'),
      from: 'Beverley Doiwa, Chairman – Office of Industrial Conciliation & Arbitration & MWB',
      subject: 'Registration and safekeeping of Tribunal Decisions',
      documentDate: new Date('2024-10-31'),
      referredTo: 'Mrs Utubasi, a/Industrial Registrar',
      dateOut: new Date('2025-01-06'),
      comments: 'This ad-hoc tribunal awards were hand-delivered to OIR and received on 06 Jan 2025. This letter was back-dated to prior my appointment, this is not proper. Hence they are to be registered under your acting IR period.',
      status: 'processed',
      relatedWorkflowId: 5,
      documents: [
        {
          name: 'Pius Yafacet vs Air Niugini Limited',
          type: 'Tribunal Decision',
          url: '#',
          dateUploaded: new Date('2025-01-06')
        }
      ]
    },
    {
      id: 'corr-3',
      dateReceived: new Date('2025-01-08'),
      from: 'George Taunakekei, Secretary – DLIR',
      subject: 'Minister\'s Planning Workshop',
      documentDate: new Date('2025-01-08'),
      referredTo: '',
      dateOut: null,
      comments: '',
      status: 'processed',
      documents: []
    },
    {
      id: 'corr-4',
      dateReceived: new Date('2025-01-27'),
      from: 'Hon. Kessy Sawang MP, Minister of Labour & Empl.',
      subject: 'Referral of Industrial Cases',
      documentDate: new Date('2025-01-07'),
      referredTo: 'Legal Team',
      dateOut: new Date('2025-01-28'),
      comments: 'Urgent review required',
      status: 'processed',
      relatedWorkflowId: 11,
      documents: []
    }
  ];

  // Sample workflow data with correspondence
  const workflows: Workflow[] = [
    // Industrial Agreements
    {
      id: 1,
      name: 'Ramu Nickel Project Operation Industrial Agreement 2025-2027',
      type: 'Industrial Agreement',
      category: 'registrations',
      status: 'Processed & Cleared',
      progress: 100,
      assigned: ['Natasha Utubasi'],
      dueDate: '2025-03-15',
      priority: 'high',
      notes: 'Successfully registered and gazetted',
      correspondence: []
    },
    {
      id: 2,
      name: 'PNG Maritime & Transport Workers Union (Amendment) Agreement 2025',
      type: 'Industrial Agreement',
      category: 'registrations',
      status: 'Returned for Correction',
      progress: 40,
      assigned: ['John Doe'],
      dueDate: '2025-04-30',
      priority: 'medium',
      notes: 'Needs proper formatting before resubmission',
      correspondence: []
    },
    
    // Tribunal Determinations - Cleared
    {
      id: 3,
      name: 'Eddy Yaman v. Air Niugini',
      type: 'Tribunal Determination',
      category: 'tribunal',
      status: 'Processed & Cleared',
      progress: 100,
      assigned: ['Legal Team'],
      dueDate: '2025-02-10',
      priority: 'high',
      notes: 'Termination case - decision in favor of employer',
      correspondence: [sampleCorrespondence[0]]
    },
    {
      id: 4,
      name: 'Shauna Paike v. Bank South Pacific',
      type: 'Tribunal Determination',
      category: 'tribunal',
      status: 'Processed & Cleared',
      progress: 100,
      assigned: ['Legal Team'],
      dueDate: '2025-02-15',
      priority: 'high',
      notes: 'Unfair dismissal claim - no hearing conducted',
      correspondence: []
    },
    {
      id: 5,
      name: 'Pius Yafaet v. Air Niugini Ltd',
      type: 'Tribunal Determination',
      category: 'tribunal',
      status: 'Pending NEC Consideration',
      progress: 80,
      assigned: ['Natasha Utubasi', 'Legal Team'],
      dueDate: '2025-05-30',
      priority: 'critical',
      notes: 'Retrospective reinstatement award - requires NEC consideration',
      correspondence: [sampleCorrespondence[1]]
    },
    
    // Union Elections
    {
      id: 6,
      name: 'Police Association of PNG Election',
      type: 'Union Election',
      category: 'unions',
      status: 'In Progress',
      progress: 60,
      assigned: ['Electoral Team'],
      dueDate: '2025-06-30',
      priority: 'high',
      notes: 'Ballot box issues from 2021 election being resolved',
      correspondence: []
    },
    {
      id: 11,
      name: 'Maria Merava vs Express Freight Management',
      type: 'Legal Review',
      category: 'legal',
      status: 'Referred to NEC',
      progress: 100,
      assigned: ['Legal Team'],
      dueDate: '2025-01-30',
      priority: 'completed',
      notes: '10-year old termination case with retrospective reinstatement',
      correspondence: [sampleCorrespondence[3]]
    }
  ];

  // Filter workflows based on active tab and filter
  const filteredWorkflows = workflows.filter(workflow => {
    const categoryMatch = activeTab === 'all' || workflow.category === activeTab;
    const statusMatch = activeFilter === 'all' || 
      (activeFilter === 'processed' && workflow.status.includes('Processed')) ||
      (activeFilter === 'returned' && workflow.status.includes('Returned')) ||
      (activeFilter === 'pending' && workflow.status.includes('Pending')) ||
      (activeFilter === 'rejected' && workflow.status === 'Rejected') ||
      (activeFilter === 'completed' && (workflow.status === 'Completed' || workflow.status === 'Resolved'));
    
    return categoryMatch && statusMatch;
  });

  // Status and priority styling
  const getStatusClass = (status: string) => {
    if (status.includes('Processed')) return 'bg-green-100 text-green-800';
    if (status.includes('Returned')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('Pending')) return 'bg-purple-100 text-purple-800';
    if (status === 'Rejected') return 'bg-red-100 text-red-800';
    if (status === 'Completed' || status === 'Resolved') return 'bg-blue-100 text-blue-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    if (status === 'Monitoring') return 'bg-orange-100 text-orange-800';
    if (status === 'Delayed') return 'bg-red-100 text-red-800';
    if (status === 'Not Started') return 'bg-gray-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Industrial Agreement': return <FileText size={16} className="mr-1" />;
      case 'Tribunal Determination': return <Gavel size={16} className="mr-1" />;
      case 'Union Election': return <Users size={16} className="mr-1" />;
      case 'Strike Intervention': return <AlertCircle size={16} className="mr-1" />;
      case 'Legal Review': return <Scale size={16} className="mr-1" />;
      case 'Policy Work': return <BookOpen size={16} className="mr-1" />;
      case 'IT Project': return <Database size={16} className="mr-1" />;
      default: return <Briefcase size={16} className="mr-1" />;
    }
  };

  const getCorrespondenceIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Mail className="text-yellow-500" size={16} />;
      case 'processed': return <FileCheck className="text-green-500" size={16} />;
      case 'archived': return <FileArchive className="text-gray-500" size={16} />;
      default: return <Mail size={16} />;
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Statistics for dashboard
  const stats = [
    { name: 'Total Workflows', value: workflows.length, icon: <FileCheck /> },
    { name: 'Processed & Cleared', value: workflows.filter(w => w.status.includes('Processed')).length, icon: <CheckCircle2 /> },
    { name: 'Pending NEC', value: workflows.filter(w => w.status.includes('Pending')).length, icon: <Clock /> },
    { name: 'Critical Priority', value: workflows.filter(w => w.priority === 'critical').length, icon: <AlertCircle /> },
    { name: 'Union Elections', value: workflows.filter(w => w.category === 'unions').length, icon: <Users /> },
    { name: 'Delayed Projects', value: workflows.filter(w => w.status === 'Delayed').length, icon: <XCircle /> }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Industrial Registrar Workflow & Correspondence Management</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <Plus size={16} className="mr-2" /> New Correspondence
          </button>
          <button className="btn-primary">
            <Plus size={16} className="mr-2" /> New Workflow
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Workflow Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row justify-between border-b gap-4">
          <div className="flex flex-wrap gap-2">
            {workflowCategories.map((category) => (
              <button 
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === category.id ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <select
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              {statusFilters.map(filter => (
                <option key={filter.id} value={filter.id}>{filter.name}</option>
              ))}
            </select>
            <div className="relative max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search workflows..."
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow Item
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkflows.map((workflow) => (
                <React.Fragment key={workflow.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${workflow.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        {getTypeIcon(workflow.type)}
                        {workflow.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {workflow.assigned.map((person, index) => (
                          <div 
                            key={index}
                            className="h-6 w-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs font-medium"
                            title={person}
                          >
                            {person.split(' ').map(name => name[0]).join('')}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(workflow.dueDate)}
                        {new Date(workflow.dueDate) < new Date() && workflow.progress < 100 && (
                          <span className="ml-1 text-red-500">(Overdue)</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(workflow.priority)}`}>
                        {workflow.priority.charAt(0).toUpperCase() + workflow.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 font-medium flex items-center justify-end ml-auto"
                        onClick={() => setShowCorrespondence(showCorrespondence === workflow.id ? null : workflow.id)}
                      >
                        {showCorrespondence === workflow.id ? (
                          <>
                            Hide <ChevronUp size={16} className="ml-1" />
                          </>
                        ) : (
                          <>
                            View <ChevronDown size={16} className="ml-1" />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Correspondence Section */}
                  {showCorrespondence === workflow.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="pl-8 pr-4">
                          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <Mail className="mr-2" size={16} /> Related Correspondence
                          </h3>
                          
                          {workflow.correspondence && workflow.correspondence.length > 0 ? (
                            <div className="space-y-4">
                              {workflow.correspondence.map((corr) => (
                                <div key={corr.id} className="border rounded-lg p-4 bg-white">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="flex items-center">
                                        {getCorrespondenceIcon(corr.status)}
                                        <span className="ml-2 text-sm font-medium">
                                          {corr.from}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-900 mt-1">{corr.subject}</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        Received: {formatDate(corr.dateReceived)} | 
                                        Document Date: {formatDate(corr.documentDate)} | 
                                        Status: <span className={`${getStatusClass(corr.status)} px-2 py-0.5 rounded-full`}>
                                          {corr.status}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-gray-500">
                                        {corr.referredTo && `Referred to: ${corr.referredTo}`}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {corr.dateOut && `Date Out: ${formatDate(corr.dateOut)}`}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {corr.comments && (
                                    <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-gray-700">
                                      {corr.comments}
                                    </div>
                                  )}
                                  
                                  {corr.documents && corr.documents.length > 0 && (
                                    <div className="mt-3">
                                      <h4 className="text-xs font-medium text-gray-500 mb-1">Documents:</h4>
                                      <div className="space-y-1">
                                        {corr.documents.map((doc, idx) => (
                                          <div key={idx} className="flex items-center text-sm">
                                            <FileText size={14} className="text-gray-400 mr-2" />
                                            <a href={doc.url} className="text-blue-600 hover:underline">
                                              {doc.name}
                                            </a>
                                            <span className="text-xs text-gray-500 ml-2">
                                              ({formatDate(doc.dateUploaded)})
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              No correspondence linked to this workflow
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                              <Plus size={14} className="mr-1" /> Add Correspondence
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredWorkflows.length}</span> of <span className="font-medium">{workflows.length}</span> workflows
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Correspondence Tracking Panel */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <Mail className="mr-2" size={20} /> Recent Correspondence
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Received
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referred To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Out
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
              {sampleCorrespondence.map((corr) => (
                <tr key={corr.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(corr.dateReceived)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="line-clamp-1 max-w-xs">{corr.from}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="line-clamp-1 max-w-xs">{corr.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(corr.documentDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {corr.referredTo || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(corr.dateOut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(corr.status)}`}>
                      {corr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 font-medium flex items-center justify-end ml-auto">
                      View <ArrowRight size={16} className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{sampleCorrespondence.length}</span> of <span className="font-medium">{sampleCorrespondence.length}</span> correspondence items
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Items Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Critical Workflows</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <ul className="space-y-4">
            {workflows
              .filter(w => w.priority === 'critical')
              .slice(0, 3)
              .map(workflow => (
                <li key={workflow.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <AlertCircle size={20} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{workflow.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{workflow.type} - Due {formatDate(workflow.dueDate)}</p>
                    <div className="mt-2 text-xs text-gray-700 line-clamp-2">{workflow.notes}</div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        
        {/* Recent Activity Panel */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium">NU</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Natasha Utubasi</div>
                        <p className="mt-0.5 text-sm text-gray-500">Processed correspondence and created workflow</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Registered tribunal decision for Eddy Yaman v. Air Niugini case.</p>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">January 6, 2025</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium">LT</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Legal Team</div>
                        <p className="mt-0.5 text-sm text-gray-500">Processed Minister's referral</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Completed review of Maria Merava case and referred to NEC.</p>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">January 28, 2025</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflows;