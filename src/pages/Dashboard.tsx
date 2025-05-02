import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  Award,
  FileText,
  BarChart as BarChartIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Gavel,
  Scale,
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Factory,
  Leaf,
  HardHat,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Vote,
  ClipboardList,
  Search,
  BookOpen,
  Anchor,
  Plane,
  Truck,
  HeartPulse,
  School,
  Landmark,
  Palmtree,
  Wrench,
  Shield,
  ShoppingBag,
  Utensils,
  FileUp,
  Plus,
  FilePlus,
  Upload,
  FileSearch,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import {
  BarChart as RechartsBar,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Interfaces
interface OnlineUser {
  id: number;
  name: string;
  username: string;
  position: string;
  lastActive: Date;
  avatar?: string;
}

interface StaffMember {
  id: number;
  name: string;
  username: string;
  position: string;
  department: string;
  lastActive: Date;
  isOnline: boolean;
}

interface CorrespondenceDocument {
  id: string;
  type: string;
  title: string;
  description: string;
  uploadedBy: string;
  recipient: string;
  recipientName: string;
  dateUploaded: Date;
  status: 'pending' | 'reviewed' | 'archived';
}

interface UnionFormData {
  unionName: string;
  registrationNumber: string;
  industry: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  constitutionFile: FileList | null;
}

interface UnionData {
  name: string;
  members: number;
  status: 'Active' | 'Due for inspection' | 'Pending' | 'Deregistered';
  registrationDate: string;
  deregistrationDate?: string;
}

interface IndustryData {
  unions: UnionData[];
  color: string;
  icon: JSX.Element;
}

interface ElectionData {
  name: string;
  value: number;
  color: string;
  unions: string[];
}

interface InspectionData {
  name: string;
  value: number;
  color: string;
  unions: string[];
}

interface WorkflowItem {
  id: number;
  name: string;
  type: string;
  dueDate: string;
  progress: number;
  assigned: string;
}

interface RecentActivity {
  id: number;
  action: string;
  entity: string;
  time: string;
  user: string;
  status: 'success' | 'warning' | 'error';
}

interface RecentWorkflow {
  id: number;
  name: string;
  action: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

interface ReportData {
  title: string;
  value: number;
  changePercent: number;
  icon: JSX.Element;
}

interface ReportCardProps {
  data: ReportData[];
}

interface MembershipData {
  name: string;
  currentMembers: number;
  previousYearMembers: number;
  trend: 'increase' | 'decrease' | 'stable';
  trendPercentage: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value.toString()}
          changePercent={item.changePercent}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

const StatCard = ({ title, value, changePercent, icon }: { 
  title: string; 
  value: string; 
  changePercent: number; 
  icon: JSX.Element 
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${changePercent >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-2">
      <span className={`inline-flex items-center text-sm font-medium ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {changePercent >= 0 ? '+' : ''}{changePercent}%
      </span>
      <span className="text-xs text-gray-500 ml-1">from last month</span>
    </div>
  </div>
);

const RecentDocuments = () => {
  const documents = [
    { id: 1, name: 'Annual Report 2023', type: 'PDF', date: '2023-12-15', size: '2.4 MB' },
    { id: 2, name: 'Union Registration Form', type: 'DOCX', date: '2023-12-10', size: '1.2 MB' },
    { id: 3, name: 'Meeting Minutes', type: 'PDF', date: '2023-12-05', size: '0.8 MB' },
    { id: 4, name: 'Financial Statement', type: 'XLSX', date: '2023-11-28', size: '3.1 MB' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FileText className="mr-2 text-blue-500" />
        Recent Documents
      </h3>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                <FileText size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{doc.date}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
        View all documents <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

const PendingApprovals = () => {
  const approvals = [
    { id: 1, name: 'Union Registration', requester: 'John Doe', date: '2023-12-14', status: 'Pending' },
    { id: 2, name: 'Document Upload', requester: 'Jane Smith', date: '2023-12-12', status: 'Pending' },
    { id: 3, name: 'Account Access', requester: 'Robert Johnson', date: '2023-12-10', status: 'Pending' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="mr-2 text-yellow-500" />
        Pending Approvals
      </h3>
      <div className="space-y-4">
        {approvals.map((approval) => (
          <div key={approval.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{approval.name}</p>
              <p className="text-xs text-gray-500">Requested by {approval.requester}</p>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-3">{approval.date}</span>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                {approval.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
        View all approvals <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

const MembershipBarGraph = ({ data }: { data: MembershipData[] }) => {
  const [trendFilter, setTrendFilter] = useState<'all' | 'increase' | 'decrease' | 'stable'>('all');

  // Sort data by current members in descending order
  const sortedData = [...data].sort((a, b) => b.currentMembers - a.currentMembers);

  // Filter data based on trend selection
  const filteredData = trendFilter === 'all' 
    ? sortedData 
    : sortedData.filter(union => union.trend === trendFilter);

  // Custom tooltip
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="font-bold">{data.name}</p>
          <p className="text-blue-600">Current Members: {data.currentMembers.toLocaleString()}</p>
          <p className="text-gray-600">Previous Year: {data.previousYearMembers.toLocaleString()}</p>
          <p className={`text-sm ${
            data.trend === 'increase' ? 'text-green-600' : 
            data.trend === 'decrease' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {data.trend === 'increase' ? '↑' : data.trend === 'decrease' ? '↓' : '→'} 
            {data.trendPercentage}% {data.trend === 'increase' ? 'increase' : data.trend === 'decrease' ? 'decrease' : 'no change'} from last year
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="mr-2 text-blue-500" />
          Union Membership Size
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTrendFilter('all')}
            className={`px-3 py-1 text-xs rounded-full ${
              trendFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTrendFilter('increase')}
            className={`px-3 py-1 text-xs rounded-full ${
              trendFilter === 'increase' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Growing
          </button>
          <button
            onClick={() => setTrendFilter('decrease')}
            className={`px-3 py-1 text-xs rounded-full ${
              trendFilter === 'decrease' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Declining
          </button>
          <button
            onClick={() => setTrendFilter('stable')}
            className={`px-3 py-1 text-xs rounded-full ${
              trendFilter === 'stable' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Stable
          </button>
        </div>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar
            layout="vertical"
            data={filteredData.slice(0, 20)} // Show top 20 unions
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={renderTooltip} />
            <Legend />
            <Bar 
              dataKey="currentMembers" 
              name="Number of Members" 
              fill="#3B82F6"
              radius={[0, 4, 4, 0]}
            >
              {filteredData.slice(0, 20).map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.trend === 'increase' ? '#10B981' :
                    entry.trend === 'decrease' ? '#EF4444' : '#3B82F6'
                  }
                />
              ))}
            </Bar>
          </RechartsBar>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-sm text-gray-500 flex items-center">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>Growing</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span>Declining</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span>Stable</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Showing top {filteredData.slice(0, 20).length} unions by membership size. Hover over bars for details.
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedElectionStatus, setSelectedElectionStatus] = useState<string | null>(null);
  const [selectedInspectionStatus, setSelectedInspectionStatus] = useState<string | null>(null);
  const [selectedUnion, setSelectedUnion] = useState<any>(null);
  const [showAllWorkflows, setShowAllWorkflows] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllRecentWorkflows, setShowAllRecentWorkflows] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<string | null>(null);
  const [showRegisterUnionModal, setShowRegisterUnionModal] = useState(false);
  const [showPendingReviews, setShowPendingReviews] = useState(false);
  const [reportType, setReportType] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [correspondence, setCorrespondence] = useState<CorrespondenceDocument[]>([]);
  
  const [unionFormData, setUnionFormData] = useState<UnionFormData>({
    unionName: '',
    registrationNumber: '',
    industry: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    constitutionFile: null
  });

  // Initialize staff data
  useEffect(() => {
    const staffData: StaffMember[] = [
      { id: 1, name: 'Natasha Utubasi', username: 'nutubasi', position: 'Industrial Registrar', department: 'Management', lastActive: new Date(), isOnline: true },
      { id: 2, name: 'Paul Wartovo', username: 'pwartovo', position: 'Deputy Industrial Registrar', department: 'Management', lastActive: new Date(), isOnline: true },
      { id: 3, name: 'Donald Vaso', username: 'dvaso', position: 'Executive Driver and Administration', department: 'Administration', lastActive: new Date(), isOnline: false },
      { id: 4, name: 'Marcella Apana', username: 'mapana', position: 'Executive Adminstrative Assistant', department: 'Administration', lastActive: new Date(), isOnline: true },
      { id: 5, name: 'Natasha Momo', username: 'nmomo', position: 'Principal Inspector Organization', department: 'Inspections', lastActive: new Date(), isOnline: false },
      { id: 6, name: 'Gilbert Patjole', username: 'gpatjole', position: 'Senior Inspector Organizations', department: 'Inspections', lastActive: new Date(), isOnline: true },
      { id: 7, name: 'Robin Baloiloi', username: 'rbaloiloi', position: 'Inspector Organization & Ballots', department: 'Inspections', lastActive: new Date(), isOnline: false },
      { id: 8, name: 'Alice Ngih', username: 'angih', position: 'Budget Officer', department: 'Registration', lastActive: new Date(), isOnline: true },
      { id: 9, name: 'Senior Liaison Officer', username: 'sliaison', position: 'Senior Liaison Officer', department: 'Liaison', lastActive: new Date(), isOnline: false },
      { id: 10, name: 'OIC Registry', username: 'oicregistry', position: 'OIC Industrial Registry', department: 'Registry', lastActive: new Date(), isOnline: true },
      { id: 11, name: 'Registry Officer', username: 'registry', position: 'Industrial Registry Officer', department: 'Registry', lastActive: new Date(), isOnline: false },
      { id: 12, name: 'Bernard Togiba', username: 'admin1', position: 'Database Administrator', department: 'IT', lastActive: new Date(), isOnline: true },
      { id: 13, name: 'Terence Jalmein', username: 'data1', position: 'Data Entry Officer', department: 'IT', lastActive: new Date(), isOnline: false }
    ];
    setStaffMembers(staffData);

    const online = staffData.filter(staff => staff.isOnline).map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      position: user.position,
      lastActive: new Date(),
      avatar: `https://i.pravatar.cc/150?u=${user.username}`
    }));
    setOnlineUsers(online);
  }, []);

  // Enhanced membership data with trends
  const enhancedMembershipData: MembershipData[] = [
    {
      name: 'PNG Teachers Association',
      currentMembers: 18500,
      previousYearMembers: 18200,
      trend: 'increase',
      trendPercentage: 1.6
    },
    {
      name: 'Public Employees Association of PNG',
      currentMembers: 12400,
      previousYearMembers: 12500,
      trend: 'decrease',
      trendPercentage: 0.8
    },
    {
      name: 'PNG Nurses Association',
      currentMembers: 9800,
      previousYearMembers: 9500,
      trend: 'increase',
      trendPercentage: 3.2
    },
    {
      name: 'National Doctors Association of PNG',
      currentMembers: 2500,
      previousYearMembers: 2500,
      trend: 'stable',
      trendPercentage: 0
    },
    {
      name: 'PNG Energy Workers Association',
      currentMembers: 1800,
      previousYearMembers: 1750,
      trend: 'increase',
      trendPercentage: 2.9
    },
    {
      name: 'Amalgamated General Workers Union of PNG',
      currentMembers: 3500,
      previousYearMembers: 3400,
      trend: 'increase',
      trendPercentage: 2.9
    },
    {
      name: 'PNG Banks & Financial Institution Workers Union',
      currentMembers: 3200,
      previousYearMembers: 3150,
      trend: 'increase',
      trendPercentage: 1.6
    },
    {
      name: 'PNG Allied Health Workers Association',
      currentMembers: 3200,
      previousYearMembers: 3100,
      trend: 'increase',
      trendPercentage: 3.2
    },
    {
      name: 'Porgera Mining & Allied Workers Union',
      currentMembers: 3200,
      previousYearMembers: 3300,
      trend: 'decrease',
      trendPercentage: 3.0
    },
    {
      name: 'Ok Tedi Mining & Allied Workers Union',
      currentMembers: 2800,
      previousYearMembers: 2900,
      trend: 'decrease',
      trendPercentage: 3.4
    },
    {
      name: 'Security Industry Workers Union',
      currentMembers: 2800,
      previousYearMembers: 2700,
      trend: 'increase',
      trendPercentage: 3.7
    },
    {
      name: 'PNG Maritime & Transport Workers Union',
      currentMembers: 2900,
      previousYearMembers: 2850,
      trend: 'increase',
      trendPercentage: 1.8
    },
    {
      name: 'West New Britain Oil Palm Workers Union',
      currentMembers: 2100,
      previousYearMembers: 2000,
      trend: 'increase',
      trendPercentage: 5.0
    },
    {
      name: 'Barrick Porgera Mining National Staff Association',
      currentMembers: 1500,
      previousYearMembers: 1450,
      trend: 'increase',
      trendPercentage: 3.4
    },
    {
      name: 'Ramu Sugar National Employees Union',
      currentMembers: 1500,
      previousYearMembers: 1550,
      trend: 'decrease',
      trendPercentage: 3.2
    },
    {
      name: 'National Airline Employees Association',
      currentMembers: 1200,
      previousYearMembers: 1250,
      trend: 'decrease',
      trendPercentage: 4.0
    },
    {
      name: 'RD Fishing Workers Union',
      currentMembers: 1200,
      previousYearMembers: 1150,
      trend: 'increase',
      trendPercentage: 4.3
    },
    {
      name: 'National Academic Staff Association of UPNG',
      currentMembers: 1200,
      previousYearMembers: 1200,
      trend: 'stable',
      trendPercentage: 0
    },
    {
      name: 'Kimbe General Workers Union',
      currentMembers: 1200,
      previousYearMembers: 1250,
      trend: 'decrease',
      trendPercentage: 4.0
    },
    {
      name: 'Higaturu Oil Palms & Processing Workers Union',
      currentMembers: 1800,
      previousYearMembers: 1850,
      trend: 'decrease',
      trendPercentage: 2.7
    },
    {
      name: 'PNG Forest Products National Staff Association',
      currentMembers: 900,
      previousYearMembers: 950,
      trend: 'decrease',
      trendPercentage: 5.3
    },
    {
      name: 'West New Britain Timber & Logging Workers Union',
      currentMembers: 750,
      previousYearMembers: 700,
      trend: 'increase',
      trendPercentage: 7.1
    },
    {
      name: 'Zenag Chicken Workers Union',
      currentMembers: 850,
      previousYearMembers: 800,
      trend: 'increase',
      trendPercentage: 6.3
    },
    {
      name: 'Poliamba Estates and Allied Workers Union',
      currentMembers: 650,
      previousYearMembers: 600,
      trend: 'increase',
      trendPercentage: 8.3
    },
    {
      name: 'Sandaun Timber Industry Workers Union',
      currentMembers: 600,
      previousYearMembers: 550,
      trend: 'increase',
      trendPercentage: 9.1
    },
    {
      name: 'PNG Air Traffic Controllers Association',
      currentMembers: 150,
      previousYearMembers: 140,
      trend: 'increase',
      trendPercentage: 7.1
    },
    {
      name: 'South Seas Tuna Workers Union',
      currentMembers: 800,
      previousYearMembers: 750,
      trend: 'increase',
      trendPercentage: 6.7
    },
    {
      name: 'PNG Hospitality Workers Union',
      currentMembers: 1800,
      previousYearMembers: 1700,
      trend: 'increase',
      trendPercentage: 5.9
    }
  ].sort((a, b) => b.currentMembers - a.currentMembers);

  // Modified timeline data for bar chart
  const unionTimelineBarData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1963 + 1 }, (_, i) => 1963 + i);
    
    const unionData = [
      { year: 1963, name: 'Madang District Workers Union', registrationDate: '27/08/1963', status: 'Deregistered', deregistrationDate: '13/08/1987' },
      { year: 1963, name: 'Lae Miscellaneous Workers Association', registrationDate: '27/09/1963', status: 'Deregistered', deregistrationDate: '09/0/1997' },
      { year: 1963, name: 'Rabaul General Workers Union', registrationDate: '27/08/1963', status: 'Deregistered', deregistrationDate: '18/07/2003' },
      { year: 1963, name: 'Employers Federation of PNG', registrationDate: '27/08/1963', status: 'Active' },
      { year: 1964, name: 'Public Employees Association of PNG', registrationDate: '17/01/1964', status: 'Active' },
      { year: 1964, name: 'East Sepik District Workers Association', registrationDate: '26/03/1964', status: 'Deregistered', deregistrationDate: '13/08/1987' },
      { year: 1964, name: 'Port Moresby Miscellaneous Workers Association', registrationDate: '22/05/1964', status: 'Deregistered', deregistrationDate: '18/06/1986' },
      { year: 1964, name: 'Timber Industry Workers, of Wau/Bulolo', registrationDate: '12/06/1964', status: 'Deregistered', deregistrationDate: '30/12/1970' },
      { year: 1964, name: 'Goroka Workers Association', registrationDate: '27/08/1964', status: 'Deregistered', deregistrationDate: '10/02/1983' },
      { year: 1964, name: 'New Ireland District Workers Association', registrationDate: '26/11/1964', status: 'Deregistered', deregistrationDate: '18/07/2003' },
      { year: 1965, name: 'Police Association of PNG', registrationDate: '09/02/1965', status: 'Active' },
      { year: 1991, name: 'Healthcare Workers Union', registrationDate: '10/11/1991', status: 'Active' },
      { year: 2005, name: 'Transport Workers Union', registrationDate: '05/06/2005', status: 'Active' },
      { year: 2024, name: 'PNG Digital Workers Union', registrationDate: '15/01/2024', status: 'Active' }
    ];

    return years.map(year => {
      const unionsForYear = unionData.filter(u => u.year === year);
      return {
        year,
        active: unionsForYear.filter(u => u.status === 'Active').length,
        inactive: unionsForYear.filter(u => u.status !== 'Active').length,
        unions: unionsForYear
      };
    });
  }, []);

  // PNG Economic Sectors with Unions
  const industryData: Record<string, IndustryData> = {
    Mining: {
      unions: [
        { name: 'Porgera Mining & Allied Workers Union', members: 3200, status: 'Active', registrationDate: '15/03/1975' },
        { name: 'Ok Tedi Mining & Allied Workers Union', members: 2800, status: 'Active', registrationDate: '22/05/1980' },
        { name: 'Barrick Porgera Mining National Staff Association', members: 1500, status: 'Active', registrationDate: '10/06/2018' }
      ],
      color: '#FF6384',
      icon: <HardHat size={16} />
    },
    Fisheries: {
      unions: [
        { name: 'RD Fishing Workers Union', members: 1200, status: 'Due for inspection', registrationDate: '05/03/2015' },
        { name: 'South Seas Tuna Workers Union', members: 800, status: 'Active', registrationDate: '18/09/2012' }
      ],
      color: '#36A2EB',
      icon: <Anchor size={16} />
    },
    Agriculture: {
      unions: [
        { name: 'Higaturu Oil Palms & Processing Workers Union', members: 1800, status: 'Due for inspection', registrationDate: '22/07/1982' },
        { name: 'Ramu Sugar National Employees Union', members: 1500, status: 'Due for inspection', registrationDate: '14/11/1990' },
        { name: 'West New Britain Oil Palm Workers Union', members: 2100, status: 'Active', registrationDate: '30/04/2005' }
      ],
      color: '#4BC0C0',
      icon: <Leaf size={16} />
    },
    Forestry: {
      unions: [
        { name: 'PNG Forest Products National Staff Association', members: 900, status: 'Due for inspection', registrationDate: '12/08/2008' },
        { name: 'West New Britain Timber & Logging Workers Union', members: 750, status: 'Active', registrationDate: '22/10/2015' },
        { name: 'Sandaun Timber Industry Workers Union', members: 600, status: 'Active', registrationDate: '05/12/2017' }
      ],
      color: '#FFCE56',
      icon: <Palmtree size={16} />
    },
    Construction: {
      unions: [
        { name: 'Amalgamated General Workers Union of PNG', members: 3500, status: 'Active', registrationDate: '15/06/1995' },
        { name: 'Kimbe General Workers Union', members: 1200, status: 'Active', registrationDate: '08/09/2010' }
      ],
      color: '#9966FF',
      icon: <Wrench size={16} />
    },
    Manufacturing: {
      unions: [
        { name: 'Zenag Chicken Workers Union', members: 850, status: 'Active', registrationDate: '20/03/2016' },
        { name: 'Poliamba Estates and Allied Workers Union', members: 650, status: 'Active', registrationDate: '14/07/2019' }
      ],
      color: '#FF9F40',
      icon: <Factory size={16} />
    },
    Transport: {
      unions: [
        { name: 'PNG Maritime & Transport Workers Union', members: 2900, status: 'Due for inspection', registrationDate: '05/06/2005' },
        { name: 'National Airline Employees Association', members: 1200, status: 'Active', registrationDate: '19/08/2011' },
        { name: 'PNG Air Traffic Controllers Association', members: 150, status: 'Pending', registrationDate: '22/02/2023' }
      ],
      color: '#8AC24A',
      icon: <Truck size={16} />
    },
    Energy: {
      unions: [
        { name: 'PNG Energy Workers Association', members: 1800, status: 'Active', registrationDate: '12/05/2007' }
      ],
      color: '#F06292',
      icon: <Landmark size={16} />
    },
    Education: {
      unions: [
        { name: 'PNG Teachers Association', members: 18500, status: 'Active', registrationDate: '27/08/1963' },
        { name: 'National Academic Staff Association of UPNG', members: 1200, status: 'Due for inspection', registrationDate: '14/03/1988' }
      ],
      color: '#FFD54F',
      icon: <School size={16} />
    },
    Healthcare: {
      unions: [
        { name: 'PNG Nurses Association', members: 9800, status: 'Active', registrationDate: '10/11/1991' },
        { name: 'National Doctors Association of PNG', members: 2500, status: 'Active', registrationDate: '15/09/2002' },
        { name: 'PNG Allied Health Workers Association', members: 3200, status: 'Active', registrationDate: '22/04/2014' }
      ],
      color: '#4DB6AC',
      icon: <HeartPulse size={16} />
    },
    Tourism: {
      unions: [
        { name: 'PNG Hospitality Workers Union', members: 1800, status: 'Active', registrationDate: '08/12/2010' }
      ],
      color: '#BA68C8',
      icon: <Utensils size={16} />
    },
    Finance: {
      unions: [
        { name: 'PNG Banks & Financial Institution Workers Union', members: 3200, status: 'Active', registrationDate: '15/07/2001' }
      ],
      color: '#7986CB',
      icon: <ShoppingBag size={16} />
    },
    Services: {
      unions: [
        { name: 'Public Employees Association of PNG', members: 12400, status: 'Active', registrationDate: '12/09/1978' },
        { name: 'Security Industry Workers Union', members: 2800, status: 'Active', registrationDate: '25/10/2013' }
      ],
      color: '#A1887F',
      icon: <Shield size={16} />
    }
  };

  // All unions flattened for tables
  const allUnions = Object.values(industryData).flatMap(industry => industry.unions);

  // Active unions in 2024
  const activeUnions2024 = allUnions.filter(u => u.status === 'Active' && u.registrationDate.includes('2024'));

  // Unions due for inspection
  const unionsDueForInspection = allUnions.filter(u => u.status === 'Due for inspection');

  // Election data with union examples
  const electionData: ElectionData[] = [
    { 
      name: 'Declared', 
      value: 28, 
      color: '#10B981',
      unions: [
        'PNG Teachers Association',
        'PNG Nurses Association',
        'Public Employees Association of PNG',
        'PNG Energy Workers Association',
        'PNG Banks & Financial Institution Workers Union'
      ]
    },
    { 
      name: 'Pending', 
      value: 12, 
      color: '#F59E0B',
      unions: [
        'PNG Air Traffic Controllers Association',
        'National Academic Staff Association of UPNG',
        'PNG Maritime & Transport Workers Union'
      ]
    },
    { 
      name: 'Disputed', 
      value: 5, 
      color: '#EF4444',
      unions: [
        'Higaturu Oil Palms & Processing Workers Union',
        'Ramu Sugar National Employees Union'
      ]
    }
  ];

  // Inspection data with union examples
  const inspectionData: InspectionData[] = [
    { 
      name: 'Completed', 
      value: 45, 
      color: '#3B82F6',
      unions: [
        'PNG Teachers Association',
        'PNG Nurses Association',
        'Public Employees Association of PNG',
        'PNG Energy Workers Association',
        'PNG Banks & Financial Institution Workers Union'
      ]
    },
    { 
      name: 'Pending', 
      value: 18, 
      color: '#F97316',
      unions: [
        'PNG Maritime & Transport Workers Union',
        'National Academic Staff Association of UPNG'
      ]
    },
    { 
      name: 'Non-Compliant', 
      value: 7, 
      color: '#EC4899',
      unions: [
        'Higaturu Oil Palms & Processing Workers Union',
        'Ramu Sugar National Employees Union'
      ]
    },
    { 
      name: 'Ceased Operations', 
      value: 3, 
      color: '#6B7280',
      unions: [
        'Porgera Gold Mine Employees Union'
      ]
    }
  ];

  // Union membership data (sorted by members)
  const membershipData = [
    { name: 'PNG Teachers Association', members: 18500 },
    { name: 'Public Employees Association of PNG', members: 12400 },
    { name: 'PNG Nurses Association', members: 9800 },
    { name: 'National Doctors Association of PNG', members: 2500 },
    { name: 'PNG Energy Workers Association', members: 1800 },
    { name: 'Amalgamated General Workers Union of PNG', members: 3500 },
    { name: 'PNG Banks & Financial Institution Workers Union', members: 3200 },
    { name: 'PNG Allied Health Workers Association', members: 3200 },
    { name: 'Porgera Mining & Allied Workers Union', members: 3200 },
    { name: 'Ok Tedi Mining & Allied Workers Union', members: 2800 },
    { name: 'Security Industry Workers Union', members: 2800 },
    { name: 'PNG Maritime & Transport Workers Union', members: 2900 },
    { name: 'West New Britain Oil Palm Workers Union', members: 2100 },
    { name: 'Barrick Porgera Mining National Staff Association', members: 1500 },
    { name: 'Ramu Sugar National Employees Union', members: 1500 },
    { name: 'National Airline Employees Association', members: 1200 },
    { name: 'RD Fishing Workers Union', members: 1200 },
    { name: 'National Academic Staff Association of UPNG', members: 1200 },
    { name: 'Kimbe General Workers Union', members: 1200 },
    { name: 'Higaturu Oil Palms & Processing Workers Union', members: 1800 },
    { name: 'PNG Forest Products National Staff Association', members: 900 },
    { name: 'West New Britain Timber & Logging Workers Union', members: 750 },
    { name: 'Zenag Chicken Workers Union', members: 850 },
    { name: 'Poliamba Estates and Allied Workers Union', members: 650 },
    { name: 'Sandaun Timber Industry Workers Union', members: 600 },
    { name: 'PNG Air Traffic Controllers Association', members: 150 },
    { name: 'South Seas Tuna Workers Union', members: 800 },
    { name: 'PNG Hospitality Workers Union', members: 1800 }
  ].sort((a, b) => b.members - a.members);

  // Union elections conducted
  const electionsConducted = [
    { union: 'PNG Teachers Association', date: '2024-03-15', result: 'Completed' },
    { union: 'PNG Nurses Association', date: '2024-02-28', result: 'Completed' },
    { union: 'Public Employees Association of PNG', date: '2024-04-10', result: 'Completed' },
    { union: 'PNG Energy Workers Association', date: '2024-05-22', result: 'Pending' },
    { union: 'PNG Banks & Financial Institution Workers Union', date: '2024-01-30', result: 'Completed' },
    { union: 'PNG Maritime & Transport Workers Union', date: '2024-06-05', result: 'Disputed' }
  ];

  // Consented awards registered in 2024
  const consentedAwards2024 = [
    { name: 'PNG Teachers Award 2024', registrationDate: '2024-01-15', parties: ['PNG Teachers Association', 'Education Department'] },
    { name: 'Healthcare Workers Award 2024', registrationDate: '2024-02-20', parties: ['PNG Nurses Association', 'Health Department'] },
    { name: 'Public Sector Award 2024', registrationDate: '2024-03-10', parties: ['Public Employees Association of PNG', 'DPM'] }
  ];

  // Arbitrated awards in 2024
  const arbitratedAwards2024 = [
    { name: 'Mining Industry Award 2024', registrationDate: '2024-04-05', arbitrator: 'Justice Mark Sevua' },
    { name: 'Transport Workers Award 2024', registrationDate: '2024-05-18', arbitrator: 'Justice David Cannings' }
  ];

  // Workflow data
  const workflowStats = {
    total: 42,
    processed: 28,
    pending: 9,
    critical: 5,
    overdue: 3,
    unionElections: 7
  };

  const criticalWorkflows = [
    {
      id: 5,
      name: 'Pius Yafaet v. Air Niugini Ltd',
      type: 'Tribunal Determination',
      dueDate: '2025-05-30',
      assigned: 'Natasha Utubasi',
      progress: 80
    },
    {
      id: 13,
      name: 'OIR Labour Market Database Implementation',
      type: 'IT Project',
      dueDate: '2025-12-31',
      assigned: 'IT Team',
      progress: 30
    },
    {
      id: 22,
      name: 'PNG Teachers Association Collective Agreement',
      type: 'Agreement Review',
      dueDate: '2024-08-15',
      assigned: 'John Kambu',
      progress: 45
    },
    {
      id: 27,
      name: 'Mining Safety Standards Review',
      type: 'Policy Development',
      dueDate: '2024-07-30',
      assigned: 'Sarah Johnson',
      progress: 20
    },
    {
      id: 31,
      name: 'Annual Report 2024 Preparation',
      type: 'Reporting',
      dueDate: '2024-06-30',
      assigned: 'Reporting Team',
      progress: 65
    }
  ];

  const recentWorkflows = [
    {
      id: 1,
      name: 'Ramu Nickel Project Operation Industrial Agreement',
      action: 'Processed & Cleared',
      time: '2 days ago',
      status: 'success'
    },
    {
      id: 2,
      name: 'PNG Maritime & Transport Workers Union Agreement',
      action: 'Returned for Correction',
      time: '1 day ago',
      status: 'warning'
    },
    {
      id: 3,
      name: 'Police Association of PNG Election',
      action: 'In Progress',
      time: '5 hours ago',
      status: 'info'
    },
    {
      id: 4,
      name: 'Maria Merava vs Express Freight Management',
      action: 'Referred to NEC',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: 5,
      name: 'Teachers Award Variation Application',
      action: 'Approved',
      time: '3 hours ago',
      status: 'success'
    },
    {
      id: 6,
      name: 'Nurses Association Financial Audit',
      action: 'Under Review',
      time: '4 hours ago',
      status: 'info'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Document Upload',
      entity: 'Financial Membership List - AMWU',
      user: 'Sarah Johnson',
      time: '2 hours ago',
      status: 'success',
    },
    {
      id: 2,
      action: 'Registration Approval',
      entity: 'Australian Teachers Union',
      user: 'Michael Chen',
      time: '3 hours ago',
      status: 'success',
    },
    {
      id: 3,
      action: 'Workflow Update',
      entity: 'Healthcare Workers Award 2025',
      user: 'James Wilson',
      time: '5 hours ago',
      status: 'warning',
    },
    {
      id: 4,
      action: 'Workflow Rejection',
      entity: 'Financial Returns - Transport Union',
      user: 'Emma Davis',
      time: '1 day ago',
      status: 'error',
    },
    {
      id: 5,
      action: 'Election Notification',
      entity: 'PNG Energy Workers Association',
      user: 'David Brown',
      time: '6 hours ago',
      status: 'success',
    },
    {
      id: 6,
      action: 'Inspection Report',
      entity: 'Ok Tedi Mining Union',
      user: 'Lisa Wong',
      time: '8 hours ago',
      status: 'success',
    }
  ];

  const handleFileUpload = async (type: string, file: File, description: string, recipient: string) => {
    setUploadProgress(0);
    setUploadError(null);
    
    try {
      // Simulate upload
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      const recipientStaff = staffMembers.find(s => s.username === recipient);
      const newDoc: CorrespondenceDocument = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        title: file.name,
        description,
        uploadedBy: user?.name || 'System',
        recipient,
        recipientName: recipientStaff?.name || 'Unknown',
        dateUploaded: new Date(),
        status: 'pending'
      };

      setCorrespondence(prev => [...prev, newDoc]);
      
      setTimeout(() => {
        clearInterval(interval);
        setUploadType(null);
      }, 3000);
      
    } catch (error) {
      setUploadError('Failed to upload document');
      setUploadProgress(0);
    }
  };

  const handleBarClick = (data: any, index: number) => {
    const industryName = industryChartData[index].name;
    setExpandedIndustry(expandedIndustry === industryName ? null : industryName);
    setSearchTerm('');
  };

  const handlePieClick = (data: any, index: number) => {
    setSelectedElectionStatus(electionData[index].name);
  };

  const handleInspectionBarClick = (data: any, index: number) => {
    setSelectedInspectionStatus(inspectionData[index].name);
  };

  const generateReport = (type: string) => {
    alert(`Generating ${type} report...`);
    setReportType(null);
  };

  const renderTimelineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="font-bold">Year: {data.year}</p>
          <p className="text-blue-600">Active Unions: {data.active}</p>
          <p className="text-red-600">Inactive Unions: {data.inactive}</p>
          {data.unions.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Unions:</p>
              <ul className="list-disc pl-5">
                {data.unions.map((union: any) => (
                  <li key={union.name} className={union.status === 'Active' ? 'text-blue-600' : 'text-red-600'}>
                    {union.name} ({union.status})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderInspectionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="font-bold">{data.name}</p>
          <p>Unions: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  const renderElectionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="font-bold">{data.name}</p>
          <p>Unions: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  // Format for bar chart
  const industryChartData = Object.entries(industryData).map(([name, data]) => ({
    name,
    unions: data.unions.length,
    color: data.color,
    icon: data.icon
  }));

  // Filter unions based on search term
  const filteredIndustryData = expandedIndustry 
    ? industryData[expandedIndustry as keyof typeof industryData].unions
      .filter(union => union.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <FileUp size={18} className="mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Unions" 
              value={allUnions.length.toString()} 
              changePercent={12.5} 
              icon={<Users className="text-blue-500" />} 
            />
            <StatCard 
              title="Industrial Awards" 
              value="89" 
              changePercent={8.2} 
              icon={<Award className="text-green-500" />} 
            />
            <StatCard 
              title="Pending Reviews" 
              value="18" 
              changePercent={-4.5} 
              icon={<Clock className="text-yellow-500" />} 
            />
            <StatCard 
              title="Critical Workflows" 
              value={workflowStats.critical.toString()} 
              changePercent={21.3} 
              icon={<AlertCircle className="text-purple-500" />} 
            />
          </div>

          {/* Membership Bar Graph */}
          <MembershipBarGraph data={enhancedMembershipData} />

          {/* Union Timeline Bar Graph */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-blue-500" />
              Union Registration Timeline (1963-{new Date().getFullYear()})
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBar 
                  data={unionTimelineBarData}
                  onClick={(data) => setSelectedYear(data.activePayload?.[0]?.payload.year)}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={renderTimelineTooltip} />
                  <Legend />
                  <Bar dataKey="active" name="Active Unions" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="inactive" name="Inactive Unions" stackId="a" fill="#EF4444" />
                </RechartsBar>
              </ResponsiveContainer>
            </div>
            {selectedYear && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Unions registered in {selectedYear}</h4>
                  <button onClick={() => setSelectedYear(null)} className="text-gray-500 hover:text-gray-700">
                    <XCircle size={16} />
                  </button>
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {unionTimelineBarData
                    .find(d => d.year === selectedYear)
                    ?.unions.map(union => (
                      <li key={union.name} className="py-1 border-b border-gray-200 last:border-0">
                        <p className="text-sm">
                          <span className={union.status === 'Active' ? 'text-blue-600' : 'text-red-600'}>
                            {union.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {union.status} • Registered: {union.registrationDate}
                            {union.deregistrationDate && ` • Deregistered: ${union.deregistrationDate}`}
                          </span>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Industry Graph */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Factory className="mr-2 text-purple-500" />
              Unions by Industry Type
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBar data={industryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="unions" 
                    name="Number of Unions"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => setSelectedIndustry(data.activePayload?.[0]?.payload.name)}
                  >
                    {industryChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Bar>
                </RechartsBar>
              </ResponsiveContainer>
            </div>
            {selectedIndustry && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Unions in {selectedIndustry} sector</h4>
                  <button onClick={() => setSelectedIndustry(null)} className="text-gray-500 hover:text-gray-700">
                    <XCircle size={16} />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {industryData[selectedIndustry].unions.map(union => (
                    <div key={union.name} className="py-2 border-b border-gray-200 last:border-0">
                      <p className="font-medium text-sm">{union.name}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{union.members.toLocaleString()} members</span>
                        <span className={`px-2 py-1 rounded-full ${
                          union.status === 'Active' ? 'bg-green-100 text-green-800' :
                          union.status === 'Due for inspection' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {union.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Registered: {union.registrationDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Union Elections Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Vote className="mr-2 text-green-500" />
              Union Election Status
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={electionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    onClick={(data) => setSelectedElectionStatus(data.name)}
                  >
                    {electionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {selectedElectionStatus && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Unions with {selectedElectionStatus} elections</h4>
                  <button onClick={() => setSelectedElectionStatus(null)} className="text-gray-500 hover:text-gray-700">
                    <XCircle size={16} />
                  </button>
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {electionData
                    .find(d => d.name === selectedElectionStatus)
                    ?.unions.map(union => (
                      <li key={union} className="py-1 border-b border-gray-200 last:border-0">
                        <p className="text-sm">{union}</p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Union Inspections Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileCheck className="mr-2 text-blue-500" />
              Union Inspection Status
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBar data={inspectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Number of Unions"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => setSelectedInspectionStatus(data.activePayload?.[0]?.payload.name)}
                  >
                    {inspectionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Bar>
                </RechartsBar>
              </ResponsiveContainer>
            </div>
            {selectedInspectionStatus && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Unions with {selectedInspectionStatus} inspections</h4>
                  <button onClick={() => setSelectedInspectionStatus(null)} className="text-gray-500 hover:text-gray-700">
                    <XCircle size={16} />
                  </button>
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {inspectionData
                    .find(d => d.name === selectedInspectionStatus)
                    ?.unions.map(union => (
                      <li key={union} className="py-1 border-b border-gray-200 last:border-0">
                        <p className="text-sm">{union}</p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recent Documents and Pending Approvals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <RecentDocuments />
            </div>
            <div>
              <PendingApprovals />
            </div>
          </div>
        </div>

        {/* New Right Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Staff Online Card */}
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
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mb-1" />
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

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {recentActivities.slice(0, 5).map(activity => (
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

          {/* Recent Workflows */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Recent Workflows</h3>
            <ul className="space-y-4">
              {recentWorkflows.slice(0, 5).map(workflow => (
                <li key={workflow.id} className="flex items-start">
                  <div className={`flex-shrink-0 mt-1 ${
                    workflow.status === 'success' ? 'text-green-500' :
                    workflow.status === 'warning' ? 'text-amber-500' : 'text-blue-500'
                  }`}>
                    {workflow.status === 'success' ? <CheckCircle2 size={16} /> : 
                     workflow.status === 'warning' ? <AlertTriangle size={16} /> : 
                     <Clock size={16} />}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{workflow.name}</p>
                    <p className="text-xs text-gray-500">{workflow.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{workflow.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View all workflows <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center w-full p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                <FilePlus size={18} className="mr-3" />
                New Document
              </button>
              <button 
                onClick={() => setShowRegisterUnionModal(true)}
                className="flex items-center w-full p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
              >
                <FileText size={18} className="mr-3" />
                Register Union
              </button>
              <button 
                onClick={() => setShowPendingReviews(true)}
                className="flex items-center w-full p-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
              >
                <FileCheck size={18} className="mr-3" />
                Process Reviews
              </button>
              <button 
                onClick={() => generateReport('summary')}
                className="flex items-center w-full p-3 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
              >
                <FileSearch size={18} className="mr-3" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Workflows Panel */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            Critical Workflows
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {criticalWorkflows.slice(0, showAllWorkflows ? undefined : 2).map((workflow) => (
            <li key={workflow.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {workflow.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{workflow.type}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Critical
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Due: {new Date(workflow.dueDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs font-medium">
                    {workflow.progress}% complete
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-red-600 h-1.5 rounded-full" 
                    style={{ width: `${workflow.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  Assigned to: {workflow.assigned}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
          <button
            onClick={() => setShowAllWorkflows(!showAllWorkflows)}
            className="text-sm font-medium text-primary hover:text-primary-dark flex items-center"
          >
            {showAllWorkflows ? 'Hide workflows' : 'View all workflows'} 
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upload Document</h3>
              <button onClick={() => {
                setShowUploadModal(false);
                setUploadError(null);
                setUploadProgress(0);
              }} className="text-gray-500 hover:text-gray-700">
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const file = formData.get('file') as File;
              const description = formData.get('description') as string;
              const recipient = formData.get('recipient') as string;
              handleFileUpload('General', file, description, recipient);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select File
                  </label>
                  <input 
                    name="file"
                    type="file" 
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea 
                    name="description"
                    rows={3}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Enter document description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select
                    name="recipient"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select staff member</option>
                    {staffMembers.map(staff => (
                      <option key={staff.username} value={staff.username}>
                        {staff.name} ({staff.position}) - @{staff.username}
                      </option>
                    ))}
                  </select>
                </div>
                
                {uploadProgress > 0 && (
                  <div className="pt-1">
                    <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
                
                {uploadError && (
                  <p className="text-sm text-red-600">{uploadError}</p>
                )}
                
                <button
                  type="submit"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadProgress === 100 ? 'Upload Complete' : 'Upload Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Union Modal */}
      {showRegisterUnionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Register New Union</h3>
              <button onClick={() => setShowRegisterUnionModal(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Union Name</label>
                <input 
                  value={unionFormData.unionName}
                  onChange={(e) => setUnionFormData({...unionFormData, unionName: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                <input 
                  value={unionFormData.registrationNumber}
                  onChange={(e) => setUnionFormData({...unionFormData, registrationNumber: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Constitution File</label>
                <input 
                  type="file" 
                  onChange={(e) => {
                    if (e.target.files) {
                      setUnionFormData({...unionFormData, constitutionFile: e.target.files});
                    }
                  }}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowRegisterUnionModal(false)} className="px-4 py-2 border rounded-md">
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!unionFormData.constitutionFile) {
                      alert('Please upload a constitution file');
                      return;
                    }
                    // Handle form submission here
                    console.log('Submitting:', unionFormData);
                    setShowRegisterUnionModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Reviews Modal */}
      {showPendingReviews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Pending Reviews</h3>
              <button onClick={() => setShowPendingReviews(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle size={20} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Union</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {correspondence.filter(doc => doc.status === 'pending').map(doc => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doc.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.dateUploaded.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.recipientName} (@{doc.recipient})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;