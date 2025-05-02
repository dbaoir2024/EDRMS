// src/contexts/DashboardContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { 
  CorrespondenceDocument, 
  RecentActivity, 
  RecentWorkflow, 
  StaffMember, 
  WorkflowItem
} from '../types/dashboardTypes';

interface DashboardContextType {
  staffMembers: StaffMember[];
  setStaffMembers: React.Dispatch<React.SetStateAction<StaffMember[]>>;
  correspondence: CorrespondenceDocument[];
  setCorrespondence: React.Dispatch<React.SetStateAction<CorrespondenceDocument[]>>;
  recentActivities: RecentActivity[];
  recentWorkflows: RecentWorkflow[];
  criticalWorkflows: WorkflowItem[];
  workflowStats: {
    total: number;
    processed: number;
    pending: number;
    critical: number;
    overdue: number;
    unionElections: number;
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [correspondence, setCorrespondence] = useState<CorrespondenceDocument[]>([]);

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      action: 'Document Upload',
      entity: 'Financial Membership List - AMWU',
      user: 'Sarah Johnson',
      time: '2 hours ago',
      status: 'success',
    },
    {
      id: 2,
      action: 'Registration Approval',
      entity: 'Australian Teachers Union',
      user: 'Michael Chen',
      time: '3 hours ago',
      status: 'success',
    },
    // ... more activities
  ];

  const recentWorkflows: RecentWorkflow[] = [
    {
      id: 1,
      name: 'Ramu Nickel Project Operation Industrial Agreement',
      action: 'Processed & Cleared',
      time: '2 days ago',
      status: 'success'
    },
    // ... more workflows
  ];

  const criticalWorkflows: WorkflowItem[] = [
    {
      id: 5,
      name: 'Pius Yafaet v. Air Niugini Ltd',
      type: 'Tribunal Determination',
      dueDate: '2025-05-30',
      assigned: 'Natasha Utubasi',
      progress: 80
    },
    // ... more critical workflows
  ];

  const workflowStats = {
    total: 42,
    processed: 28,
    pending: 9,
    critical: 5,
    overdue: 3,
    unionElections: 7
  };

  return (
    <DashboardContext.Provider value={{
      staffMembers,
      setStaffMembers,
      correspondence,
      setCorrespondence,
      recentActivities,
      recentWorkflows,
      criticalWorkflows,
      workflowStats
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};