import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SettingsLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'User Management', href: '/settings/users', adminOnly: true },
    { name: 'Profile', href: '/settings/profile' },
    { name: 'Security', href: '/settings/security' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      {/* Sidebar navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <nav className="space-y-1">
            {navigation
              .filter(item => !item.adminOnly || user?.role === 'admin')
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-white rounded-lg shadow p-4 lg:p-6">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default SettingsLayout;