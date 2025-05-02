// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
}

// Union types
export interface Union {
  id: string;
  code: string;
  name: string;
  abbreviation: string;
  registeredDate: string;
  status: 'active' | 'inactive' | 'pending';
  memberCount: number;
}

// Award types
export interface Award {
  id: string;
  code: string;
  name: string;
  unionId: string;
  unionName: string;
  effectiveDate: string;
  expiryDate: string | null;
  status: 'active' | 'expired' | 'pending';
}

// Document types
export interface Document {
  id: string;
  fileName: string;
  unionCode: string;
  unionName: string;
  folderCode: string;
  folderName: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
}

// Membership types
export interface Member {
  id: string;
  unionId: string;
  name: string;
  employeeId: string;
  position: string;
  joiningDate: string;
  status: 'active' | 'inactive';
}

// Folder types
export interface Folder {
  code: string;
  name: string;
}