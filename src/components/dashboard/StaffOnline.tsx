// src/components/dashboard/StaffOnline.tsx
import React from 'react';
import { Users } from 'lucide-react';
import { OnlineUser } from '../../types/dashboardTypes';

interface StaffOnlineProps {
  onlineUsers: OnlineUser[];
}

const StaffOnline: React.FC<StaffOnlineProps> = ({ onlineUsers }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Users className="mr-2 text-blue-500" />
          Staff Online ({onlineUsers.length})
        </h3>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
      
      {onlineUsers.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {onlineUsers.map(user => (
            <div key={user.username} className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src={user.avatar || `https://i.pravatar.cc/150?u=${user.username}`} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full mb-1" 
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium truncate w-full">{user.name}</p>
                <p className="text-xs text-gray-500 truncate w-full">{user.position.split(' ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center py-4 text-gray-500 text-sm">
          No staff members currently online
        </div>
      )}
    </div>
  );
};

export default StaffOnline;