// src/components/dashboard/UnionTimelineChart.tsx
import React, { useMemo } from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Clock } from 'lucide-react';

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

const UnionTimelineChart: React.FC = () => {
  const unionTimelineBarData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1963 + 1 }, (_, i) => 1963 + i);
    
    const unionData = [
      // ... same union data as original
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="mr-2 text-blue-500" />
        Union Registration Timeline (1963-{new Date().getFullYear()})
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar data={unionTimelineBarData}>
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
    </div>
  );
};

export default UnionTimelineChart;