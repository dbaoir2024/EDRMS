// src/types/dashboardTypes.ts
export interface OnlineUser {
    id: number;
    name: string;
    username: string;
    position: string;
    lastActive: Date;
    avatar?: string;
  }
  
  export interface StaffMember {
    id: number;
    name: string;
    username: string;
    position: string;
    department: string;
    lastActive: Date;
    isOnline: boolean;
  }
  
  export interface CorrespondenceDocument {
    id: string;
    type: string;
    title: string;
    description: string;
    uploadedBy: string;
    recipient: string;
    recipientName: string;
    dateUploaded: Date;
    status: 'pending' | 'reviewed' | 'archived';
    folder?: string;
  }
  
  export interface UnionData {
    name: string;
    members: number;
    status: 'Active' | 'Due for inspection' | 'Pending' | 'Deregistered';
    registrationDate: string;
    deregistrationDate?: string;
  }
  
  export interface IndustryData {
    unions: UnionData[];
    color: string;
    icon: JSX.Element;
  }
  
  export interface RecentActivity {
    id: number;
    action: string;
    entity: string;
    user: string;
    time: string;
    status: 'success' | 'warning' | 'error';
  }
  
  export interface RecentWorkflow {
    id: number;
    name: string;
    action: string;
    time: string;
    status: 'success' | 'warning' | 'info';
  }
  
  export interface WorkflowItem {
    id: number;
    name: string;
    type: string;
    dueDate: string;
    assigned: string;
    progress: number;
  }