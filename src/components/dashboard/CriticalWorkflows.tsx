// src/components/dashboard/CriticalWorkflows.tsx
import React, { useState } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { WorkflowItem } from '../../types/dashboardTypes';

interface CriticalWorkflowsProps {
  workflows: WorkflowItem[];
}

const CriticalWorkflows: React.FC<CriticalWorkflowsProps> = ({ workflows }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          Critical Workflows
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {workflows.slice(0, showAll ? undefined : 2).map((workflow) => (
          <li key={workflow.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {workflow.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{workflow.type}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Critical
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Due: {new Date(workflow.dueDate).toLocaleDateString()}
                </div>
                <div className="text-xs font-medium">
                  {workflow.progress}% complete
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-red-600 h-1.5 rounded-full" 
                  style={{ width: `${workflow.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                Assigned to: {workflow.assigned}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium text-primary hover:text-primary-dark flex items-center"
        >
          {showAll ? 'Hide workflows' : 'View all workflows'} 
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CriticalWorkflows;