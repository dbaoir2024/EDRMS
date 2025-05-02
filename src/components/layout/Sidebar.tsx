import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  X, 
  Home, 
  Users, 
  Award, 
  FileText, 
  Database, 
  UserCheck, 
  Settings as SettingsIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Workflow // Add this import
} from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Updated professional color palettey
  const primaryColor = '#1e3a8a';       // Navy blue
  const primaryLight = '#3b82f6';       // Bright blue
  const primaryDark = '#1e40af';        // Darker blue
  const primaryDarker = '#1e1b4b';      // Deep navy
  const accentColor = '#10b981';        // Emerald green for active states
  const textColor = '#f8fafc';          // Light text
  const textMuted = '#e2e8f0';          // Muted text
  const hoverBg = 'rgba(255, 255, 255, 0.1)'; // Subtle hover effect

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Workflows', href: '/workflows', icon: Workflow }, // Add this line
    { name: 'Unions Registry', href: '/unions', icon: Users },
    { name: 'Industrial Awards', href: '/awards', icon: Award },
    { name: 'Membership Lists', href: '/membership', icon: UserCheck },
  
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: SettingsIcon,
      children: [
        { name: 'User Management', href: '/settings/users', adminOnly: true },
        { name: 'Profile', href: '/settings/profile' },
        { name: 'Security', href: '/settings/security' },
      ]
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path) && path !== '/';
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
          style={{ backgroundColor: primaryColor }}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && isMobile && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full" style={{ backgroundColor: primaryColor }}>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <Database className="h-8 w-8 text-white" />
                <span className="ml-2 text-lg font-semibold text-white">OIR EDRMS</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation
                  .filter(item => !item.adminOnly || user?.role === 'admin')
                  .map((item) => (
                    <React.Fragment key={item.name}>
                      <Link
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          location.pathname === item.href || isActivePath(item.href)
                            ? 'text-white bg-primaryDark'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                        style={{
                          backgroundColor: location.pathname === item.href || isActivePath(item.href) 
                            ? primaryDark 
                            : 'transparent',
                          color: textColor
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6"
                          style={{ color: textMuted }}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                      {item.children && isActivePath(item.href) && (
                        <div className="ml-8 space-y-1">
                          {item.children
                            .filter(child => !child.adminOnly || user?.role === 'admin')
                            .map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                  location.pathname === child.href
                                    ? 'text-white bg-primaryDarker'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                                style={{
                                  backgroundColor: location.pathname === child.href 
                                    ? primaryDarker 
                                    : 'transparent',
                                  color: textMuted
                                }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t p-4" style={{ borderColor: primaryDark }}>
              <div className="flex items-center">
                <div 
                  className="h-10 w-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: primaryLight }}
                >
                  {user?.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">{user?.name}</p>
                  <p className="text-sm font-medium" style={{ color: textMuted }}>{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="ml-auto flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-700"
                style={{ backgroundColor: primaryDark }}
              >
                <LogOut className="h-5 w-5 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div 
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300 ease-in-out ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between px-4">
            {!collapsed && (
              <div className="flex items-center">
                <Database className="h-8 w-8 text-white" />
                <span className="ml-2 text-lg font-semibold text-white">OIR EDRMS</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-white focus:outline-none hover:bg-gray-700"
              style={{ backgroundColor: primaryDark }}
            >
              <span className="sr-only">Collapse sidebar</span>
              {collapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
            </button>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation
              .filter(item => !item.adminOnly || user?.role === 'admin')
              .map((item) => (
                <React.Fragment key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href || isActivePath(item.href)
                        ? 'text-white bg-primaryDark'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: location.pathname === item.href || isActivePath(item.href) 
                        ? primaryDark 
                        : 'transparent',
                      color: textColor
                    }}
                  >
                    <item.icon
                      className={`flex-shrink-0 h-6 w-6 ${!collapsed ? 'mr-3' : 'mx-auto'}`}
                      style={{ color: textMuted }}
                      aria-hidden="true"
                    />
                    {!collapsed && item.name}
                  </Link>
                  {!collapsed && item.children && isActivePath(item.href) && (
                    <div className="ml-8 space-y-1">
                      {item.children
                        .filter(child => !child.adminOnly || user?.role === 'admin')
                        .map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                              location.pathname === child.href
                                ? 'text-white bg-primaryDarker'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                            style={{
                              backgroundColor: location.pathname === child.href 
                                ? primaryDarker 
                                : 'transparent',
                              color: textMuted
                            }}
                          >
                            {child.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
          </nav>
        </div>
        <div 
          className="flex-shrink-0 flex p-4 border-t"
          style={{ 
            backgroundColor: primaryDark,
            borderColor: primaryDarker
          }}
        >
          {!collapsed && (
            <div className="flex items-center">
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: primaryLight }}
              >
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs font-medium" style={{ color: textMuted }}>{user?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className={`flex items-center justify-center rounded-full hover:bg-gray-700 ${collapsed ? 'mx-auto' : 'ml-auto'}`}
            style={{ 
              width: collapsed ? '2rem' : '2rem',
              height: '2rem',
              backgroundColor: primaryDark
            }}
          >
            <LogOut className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Toggle button for collapsed sidebar */}
      {collapsed && !isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-1/2 z-30 -translate-y-1/2 p-1 rounded-r-md text-white focus:outline-none"
          style={{ backgroundColor: primaryColor }}
        >
          <span className="sr-only">Expand sidebar</span>
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default Sidebar;