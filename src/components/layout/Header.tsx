import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, Bell, ChevronDown, Search, Database, Sun, Moon, User, LogOut, X, 
  FileText, File, Users, Award, FileSearch, Filter, Loader2 
} from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { searchDocuments } from '../../services/documentService';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  type: 'user' | 'union' | 'certificate' | 'award' | 'constitution' | 'membership' | 'file';
  title: string;
  description: string;
  unionName?: string;
  fileType?: 'pdf' | 'doc' | 'xls' | 'jpg' | 'png' | 'other';
  date: string;
  path: string;
  relevance?: number;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  action?: {
    type: string;
    targetId: string;
  };
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    unions: true,
    certificates: true,
    awards: true,
    constitutions: true,
    memberships: true,
    files: true,
    users: false,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Initialize with sample notifications (replace with API call)
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        title: 'Document Assigned',
        description: 'You have been assigned to review "Annual Report 2024.pdf"',
        time: '2 hours ago',
        read: false,
        action: {
          type: 'document',
          targetId: 'doc-123'
        }
      },
      {
        id: 2,
        title: 'Workflow Update',
        description: 'License Renewal workflow has been updated',
        time: '5 hours ago',
        read: false,
        action: {
          type: 'workflow',
          targetId: 'wf-456'
        }
      },
    ];
    setNotifications(sampleNotifications);
    setUnreadNotifications(sampleNotifications.filter(n => !n.read).length);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Search when query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      performSearch();
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }, [debouncedSearchQuery, searchFilters]);

  const performSearch = async () => {
    try {
      setIsSearching(true);
      setSearchOpen(true);
      
      const activeFilters = Object.entries(searchFilters)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      
      // Simulate API call (replace with actual implementation)
      const mockResults: SearchResult[] = [
        {
          id: 'union-123',
          type: 'union',
          title: 'National Workers Union',
          description: 'Registered trade union for construction workers',
          date: '2023-05-15',
          path: '/unions/union-123',
          relevance: 0.95
        },
        {
          id: 'doc-456',
          type: 'certificate',
          title: 'Registration Certificate NWU-2023',
          description: 'Official registration document',
          unionName: 'National Workers Union',
          fileType: 'pdf',
          date: '2023-05-20',
          path: '/documents/certificate-456',
          relevance: 0.87
        },
        {
          id: 'file-789',
          type: 'file',
          title: 'NWU Membership List Q1 2024',
          description: 'Current membership roster',
          unionName: 'National Workers Union',
          fileType: 'xls',
          date: '2024-01-15',
          path: '/files/membership-789',
          relevance: 0.82
        },
        {
          id: 'doc-321',
          type: 'constitution',
          title: 'NWU Constitution 2023',
          description: 'Union constitution and bylaws',
          unionName: 'National Workers Union',
          fileType: 'doc',
          date: '2023-06-01',
          path: '/documents/constitution-321',
          relevance: 0.78
        },
        {
          id: 'award-654',
          type: 'award',
          title: 'Best Union Award 2023',
          description: 'Certificate of excellence',
          unionName: 'National Workers Union',
          fileType: 'jpg',
          date: '2023-12-05',
          path: '/awards/award-654',
          relevance: 0.75
        }
      ].filter(result => 
        activeFilters.includes(result.type === 'file' ? 'files' : `${result.type}s`)
      );

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToProfile = () => {
    navigate('/settings/profile');
    setUserMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleFilter = (filter: keyof typeof searchFilters) => {
    setSearchFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const getIconForType = (type: SearchResult['type']) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-500" />;
      case 'union': return <Users className="h-4 w-4 text-indigo-500" />;
      case 'certificate': return <FileText className="h-4 w-4 text-green-500" />;
      case 'award': return <Award className="h-4 w-4 text-yellow-500" />;
      case 'constitution': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'membership': return <Users className="h-4 w-4 text-teal-500" />;
      case 'file': return <File className="h-4 w-4 text-gray-500" />;
      default: return <FileSearch className="h-4 w-4 text-gray-400" />;
    }
  };

  const getFileTypeIcon = (fileType?: string) => {
    switch (fileType) {
      case 'pdf': return <span className="text-red-500 text-xs font-medium">PDF</span>;
      case 'doc': return <span className="text-blue-500 text-xs font-medium">DOC</span>;
      case 'xls': return <span className="text-green-500 text-xs font-medium">XLS</span>;
      case 'jpg':
      case 'png': return <span className="text-purple-500 text-xs font-medium">IMG</span>;
      default: return <span className="text-gray-500 text-xs font-medium">FILE</span>;
    }
  };

  const navigateToResult = (result: SearchResult) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(result.path);
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
    
    // Navigate if there's an action
    if (notification.action) {
      switch (notification.action.type) {
        case 'document':
          navigate(`/documents/${notification.action.targetId}`);
          break;
        case 'workflow':
          navigate(`/workflows/${notification.action.targetId}`);
          break;
        default:
          break;
      }
    }
    setNotificationsOpen(false);
  };

  return (
    <header className="relative z-30 flex-shrink-0 flex h-16 bg-white shadow border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {/* Left section - Logo and mobile menu button */}
      <div className="flex items-center px-4">
        <button
          type="button"
          className="mr-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden dark:text-gray-300"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <Database className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold text-primary hidden md:block dark:text-primary-300">OIR RMS</span>
        </div>
      </div>

      {/* Center section - Search bar */}
      <div className="flex-1 flex justify-center px-4 relative" ref={searchRef}>
        <div className="w-full max-w-2xl">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-200">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Search className="h-5 w-5" />
            </div>
            <input
              id="search-field"
              className="block w-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
              placeholder="Search unions, documents, users..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setSearchOpen(true)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-200"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setSearchOpen(false);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="absolute right-0 bottom-0 translate-y-full">
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={() => setSearchOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Search results dropdown */}
          {searchOpen && (
            <div className="origin-top-right absolute right-0 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden dark:bg-gray-700 dark:ring-gray-600">
              {/* Search filters */}
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">Filters:</span>
                {Object.entries(searchFilters).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    className={`px-2 py-1 text-xs rounded-full flex items-center ${value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200'}`}
                    onClick={() => toggleFilter(key as keyof typeof searchFilters)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search results */}
              <div className="max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults
                    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
                    .map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-100 dark:border-gray-600 last:border-0"
                        onClick={() => navigateToResult(result)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-1">
                            {getIconForType(result.type)}
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {result.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                              {result.unionName && `${result.unionName} • `}
                              {result.description}
                            </p>
                            <div className="mt-1 flex items-center text-xs text-gray-400 dark:text-gray-400">
                              <span className="capitalize">{result.type}</span>
                              {result.fileType && (
                                <>
                                  <span className="mx-1">•</span>
                                  {getFileTypeIcon(result.fileType)}
                                </>
                              )}
                              <span className="mx-1">•</span>
                              <span>{new Date(result.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <FileSearch className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {searchQuery ? 'No results found' : 'Start typing to search'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right section - User controls */}
      <div className="flex items-center pr-4">
        {/* Dark mode toggle */}
        <button
          type="button"
          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:text-gray-300 dark:hover:text-gray-200"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <div className="relative ml-3" ref={notificationsRef}>
          <div>
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary relative dark:text-gray-300 dark:hover:text-gray-200"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUserMenuOpen(false);
                setSearchOpen(false);
              }}
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
          
          {notificationsOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 dark:bg-gray-700 dark:ring-gray-600">
              <div className="px-4 py-2 border-b dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer ${notification.read ? '' : 'bg-blue-50 dark:bg-gray-600'}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start">
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{notification.description}</p>
                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">No notifications</p>
                  </div>
                )}
              </div>
              <div className="border-t px-4 py-2 dark:border-gray-600">
                <button 
                  className="text-sm text-primary hover:text-primary-dark font-medium dark:text-primary-300 dark:hover:text-primary-200"
                  onClick={() => navigate('/notifications')}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="ml-3 relative" ref={userMenuRef}>
          <div>
            <button
              type="button"
              className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotificationsOpen(false);
                setSearchOpen(false);
              }}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-white">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400 dark:text-gray-300" />
            </button>
          </div>
          
          {userMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 dark:bg-gray-700 dark:ring-gray-600">
              <div className="px-4 py-2 border-b dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 truncate">{user?.email || ''}</p>
              </div>
              <button
                onClick={navigateToProfile}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <User className="h-4 w-4 mr-2" />
                Your Profile
              </button>
              <button
                onClick={toggleDarkMode}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-200 dark:hover:bg-gray-600"
              >
                {darkMode ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;