import { useState } from 'react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    documentAssignments: true,
    workflowUpdates: true,
    documentUpdates: false,
    systemNotifications: true,
    browserNotifications: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
      
      <div className="space-y-6">
        {/* Notification toggles from your original code */}
        {/* ... */}
      </div>
    </div>
  );
};

export default NotificationSettings;