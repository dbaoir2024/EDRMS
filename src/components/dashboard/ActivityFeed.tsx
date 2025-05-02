// src/components/dashboard/ActivityFeed.tsx
import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { RecentActivity } from '../../types/dashboardTypes';

interface ActivityFeedProps {
  activities: RecentActivity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.slice(0, 5).map(activity => (
          <li key={activity.id} className="flex items-start">
            <div className={`flex-shrink-0 mt-1 ${
              activity.status === 'success' ? 'text-green-500' :
              activity.status === 'warning' ? 'text-amber-500' : 'text-red-500'
            }`}>
              {activity.status === 'success' ? <CheckCircle2 size={16} /> : 
               activity.status === 'warning' ? <AlertTriangle size={16} /> : 
               <XCircle size={16} />}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.entity}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time} by {activity.user}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
        View all activity <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default ActivityFeed;