// src/components/dashboard/WorkflowList.tsx
import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { RecentWorkflow } from '../../types/dashboardTypes';

interface WorkflowListProps {
  workflows: RecentWorkflow[];
}

const WorkflowList: React.FC<WorkflowListProps> = ({ workflows }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Recent Workflows</h3>
      <ul className="space-y-4">
        {workflows.slice(0, 5).map(workflow => (
          <li key={workflow.id} className="flex items-start">
            <div className={`flex-shrink-0 mt-1 ${
              workflow.status === 'success' ? 'text-green-500' :
              workflow.status === 'warning' ? 'text-amber-500' : 'text-blue-500'
            }`}>
              {workflow.status === 'success' ? <CheckCircle2 size={16} /> : 
               workflow.status === 'warning' ? <AlertTriangle size={16} /> : 
               <Clock size={16} />}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{workflow.name}</p>
              <p className="text-xs text-gray-500">{workflow.action}</p>
              <p className="text-xs text-gray-400 mt-1">{workflow.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
        View all workflows <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default WorkflowList;