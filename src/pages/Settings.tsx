import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Shield, Bell, HardDrive, Users, Key, FileText, Layers 
} from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Extract active tab from URL
  const activeTab = location.pathname.split('/settings/')[1] || 'profile';

  const handleTabChange = (tab: string) => {
    navigate(`/settings/${tab}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="space-y-1">
              <button
                onClick={() => handleTabChange('profile')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User size={18} className={`mr-3 ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => handleTabChange('security')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield size={18} className={`mr-3 ${activeTab === 'security' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>Security</span>
              </button>
              
              <button
                onClick={() => handleTabChange('notifications')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bell size={18} className={`mr-3 ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => handleTabChange('storage')}
                className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                  activeTab === 'storage' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <HardDrive size={18} className={`mr-3 ${activeTab === 'storage' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>Storage</span>
              </button>
              
              {user?.role === 'admin' && (
                <>
                  <hr className="my-4 border-gray-200" />
                  
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Administration</h3>
                  </div>
                  
                  <button
                    onClick={() => handleTabChange('users')}
                    className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                      activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Users size={18} className={`mr-3 ${activeTab === 'users' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span>User Management</span>
                  </button>
                  
                  <button className="flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    <Key size={18} className="mr-3 text-gray-400" />
                    <span>API Keys</span>
                  </button>
                  
                  <button className="flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    <FileText size={18} className="mr-3 text-gray-400" />
                    <span>Audit Logs</span>
                  </button>
                  
                  <button className="flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    <Layers size={18} className="mr-3 text-gray-400" />
                    <span>Classification Scheme</span>
                  </button>
                </>
              )}
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;