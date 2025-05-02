import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles as a type
type UserRole = 'admin' | 'manager' | 'staff';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Add additional user fields as needed
  department?: string;
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock API service
  const authService = {
    login: async (email: string, password: string): Promise<User> => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const mockUsers: Record<string, User> = {
        'admin@oir.gov': {
          id: '1',
          name: 'Admin User',
          email: 'admin@oir.gov',
          role: 'admin',
          department: 'IT'
        },
        'manager@oir.gov': {
          id: '2',
          name: 'Manager User',
          email: 'manager@oir.gov',
          role: 'manager',
          department: 'Operations'
        },
        'staff@oir.gov': {
          id: '3',
          name: 'Staff User',
          email: 'staff@oir.gov',
          role: 'staff',
          department: 'Records'
        }
      };
      
      if (email in mockUsers && password === 'password') {
        return mockUsers[email];
      }
      throw new Error('Invalid email or password');
    },
    
    refresh: async (): Promise<User> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (!user) throw new Error('No user to refresh');
      return { ...user, lastLogin: new Date() };
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Validate stored user data
          if (parsedUser && parsedUser.id && parsedUser.email) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Failed to initialize auth', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Additional cleanup can be done here
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const updatedUser = await authService.refresh();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};