import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { BranchName } from '../types';

const Reports: React.FC = () => {
  // Mock Data for Reports
  const revenueData = [
    { month: 'Jan', revenue: 400000, expenses: 240000 },
    { month: 'Feb', revenue: 300000, expenses: 139800 },
    { month: 'Mar', revenue: 550000, expenses: 380000 },
    { month: 'Apr', revenue: 480000, expenses: 300800 },
    { month: 'May', revenue: 420000, expenses: 280000 },
    { month: 'Jun', revenue: 650000, expenses: 430000 },
  ];

  const branchPerformance = Object.values(BranchName).map(branch => ({
    name: branch,
    completed: Math.floor(Math.random() * 100) + 50,
    overdue: Math.floor(Math.random() * 20),
    revenue: Math.floor(Math.random() * 500000) + 100000
  }));

  const serviceDistribution = [
    { name: 'GST', value: 40, color: '#3b82f6' },
    { name: 'Income Tax', value: 30, color: '#10b981' },
    { name: 'Audit', value: 15, color: '#f59e0b' },
    { name: 'ROC', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#64748b' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Analytics & Reports</h2>
        <p className="text-slate-500 mt-1">Deep dive into firm performance, revenue, and compliance metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Revenue Overview</h3>
            <select className="bg-slate-50 border border-slate-200 rounded text-sm px-2 py-1 text-slate-600">
               <option>Last 6 Months</option>
               <option>This FY</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Line type="monotone" dataKey="expenses" stroke="#94a3b8" strokeDasharray="5 5" dot={false} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Comparison */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Branch Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformance} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} width={100} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Legend />
                <Bar dataKey="completed" name="Tasks Completed" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="overdue" name="Tasks Overdue" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Service Mix */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Revenue by Service</h3>
            <p className="text-sm text-slate-500 mb-6">Distribution across service verticals.</p>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {serviceDistribution.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                     <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* SLA Compliance Table */}
         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-semibold text-slate-800">SLA Compliance</h3>
               <button className="text-sm text-blue-600 font-medium hover:underline">Full Report</button>
            </div>
            <div className="overflow-x-auto">
               <table className="min-w-full">
                  <thead>
                     <tr className="border-b border-slate-200">
                        <th className="text-left text-xs font-semibold text-slate-500 uppercase pb-3">Service</th>
                        <th className="text-center text-xs font-semibold text-slate-500 uppercase pb-3">Volume</th>
                        <th className="text-center text-xs font-semibold text-slate-500 uppercase pb-3">Avg. Time</th>
                        <th className="text-center text-xs font-semibold text-slate-500 uppercase pb-3">On-Time %</th>
                        <th className="text-right text-xs font-semibold text-slate-500 uppercase pb-3">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     <tr>
                        <td className="py-3 text-sm font-medium text-slate-800">GSTR-3B</td>
                        <td className="py-3 text-center text-sm text-slate-600">452</td>
                        <td className="py-3 text-center text-sm text-slate-600">2.1 days</td>
                        <td className="py-3 text-center text-sm font-medium text-emerald-600">98%</td>
                        <td className="py-3 text-right"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Excellent</span></td>
                     </tr>
                     <tr>
                        <td className="py-3 text-sm font-medium text-slate-800">ITR Filing</td>
                        <td className="py-3 text-center text-sm text-slate-600">128</td>
                        <td className="py-3 text-center text-sm text-slate-600">5.4 days</td>
                        <td className="py-3 text-center text-sm font-medium text-blue-600">92%</td>
                        <td className="py-3 text-right"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Good</span></td>
                     </tr>
                     <tr>
                        <td className="py-3 text-sm font-medium text-slate-800">Company ROC</td>
                        <td className="py-3 text-center text-sm text-slate-600">45</td>
                        <td className="py-3 text-center text-sm text-slate-600">8.2 days</td>
                        <td className="py-3 text-center text-sm font-medium text-orange-600">85%</td>
                        <td className="py-3 text-right"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">At Risk</span></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;
