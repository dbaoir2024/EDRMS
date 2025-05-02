// src/components/dashboard/StatsCards.tsx
import React from 'react';
import { Users, Award, Clock, AlertCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  changePercent: number;
  icon: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, changePercent, icon }) => (
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

interface StatsCardsProps {
  workflowStats: {
    critical: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ workflowStats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard 
      title="Total Unions" 
      value="156" 
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
);

export default StatsCards;