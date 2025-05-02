// src/components/dashboard/IndustryChart.tsx
import React from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Factory } from 'lucide-react';

interface IndustryChartProps {
  industryData: Record<string, {
    unions: any[];
    color: string;
    icon: JSX.Element;
  }>;
  expandedIndustry: string | null;
  onBarClick: (name: string) => void;
}

const IndustryChart: React.FC<IndustryChartProps> = ({ 
  industryData, 
  expandedIndustry,
  onBarClick 
}) => {
  const industryChartData = Object.entries(industryData).map(([name, data]) => ({
    name,
    unions: data.unions.length,
    color: data.color,
    icon: data.icon
  }));

  return (
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
              onClick={(data) => onBarClick(data.name)}
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
    </div>
  );
};

export default IndustryChart;