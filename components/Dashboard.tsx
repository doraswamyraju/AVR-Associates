import React from 'react';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getStats, mockTasks } from '../services/mockData';
import { BranchName, TaskStatus } from '../types';

const Dashboard: React.FC = () => {
  const stats = getStats();

  const taskByBranchData = Object.values(BranchName).map(branch => ({
    name: branch,
    tasks: mockTasks.filter(t => t.branch === branch && t.status !== TaskStatus.Completed).length
  }));

  const taskStatusData = [
    { name: 'Completed', value: mockTasks.filter(t => t.status === TaskStatus.Completed || t.status === TaskStatus.Filed).length, color: '#10b981' },
    { name: 'In Progress', value: mockTasks.filter(t => t.status === TaskStatus.InProgress || t.status === TaskStatus.Review).length, color: '#3b82f6' },
    { name: 'Pending Client', value: mockTasks.filter(t => t.status === TaskStatus.PendingClient).length, color: '#f59e0b' },
    { name: 'Overdue', value: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== TaskStatus.Completed).length, color: '#ef4444' },
  ];

  const recentActivities = mockTasks.slice(0, 5).map(task => ({
      id: task.id,
      text: `Updated ${task.title} to ${task.status}`,
      time: 'Just now',
      user: task.assignedTo
  }));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Clients" 
          value={stats.totalClients} 
          icon={Users} 
          trend="+4 this month" 
          trendType="positive"
          color="blue"
        />
        <StatCard 
          title="Pending Tasks" 
          value={stats.pendingTasks} 
          icon={Clock} 
          trend="12 due today" 
          trendType="neutral"
          color="orange"
        />
        <StatCard 
          title="Overdue Tasks" 
          value={stats.overdueTasks} 
          icon={AlertTriangle} 
          trend="Requires attention" 
          trendType="negative"
          color="red"
        />
        <StatCard 
          title="Revenue (MTD)" 
          value={`₹${(stats.revenueMTD / 1000).toFixed(1)}k`} 
          icon={TrendingUp} 
          trend="+12% vs last month" 
          trendType="positive"
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Active Workload by Branch</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskByBranchData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Status Donut */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Task Status Distribution</h3>
          <div className="flex-1 h-64 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
             {taskStatusData.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-600">{item.name}</span>
                   </div>
                   <span className="font-semibold text-slate-800">{item.value}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
               <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
               {recentActivities.map((activity, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-start space-x-3">
                     <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                        <FileText className="h-4 w-4" />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm text-slate-800">{activity.text}</p>
                        <p className="text-xs text-slate-500 mt-1">by <span className="font-medium text-slate-700">{activity.user}</span> • {activity.time}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between">
            <div>
               <h3 className="text-xl font-bold mb-2">Compliance Calendar</h3>
               <p className="text-slate-300 text-sm mb-6">Upcoming statutory deadlines for this month.</p>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                     <div className="flex items-center space-x-3">
                        <div className="bg-red-500/20 text-red-400 p-2 rounded">20th</div>
                        <div>
                           <p className="font-medium">GSTR-3B Filing</p>
                           <p className="text-xs text-slate-400">Monthly Return</p>
                        </div>
                     </div>
                     <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">High Priority</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                     <div className="flex items-center space-x-3">
                        <div className="bg-blue-500/20 text-blue-400 p-2 rounded">25th</div>
                        <div>
                           <p className="font-medium">PF Return</p>
                           <p className="text-xs text-slate-400">Monthly Challan</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            <button className="mt-6 flex items-center justify-center w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium">
               Go to Compliance Calendar
               <ArrowRight className="h-4 w-4 ml-2" />
            </button>
         </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendType, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  const trendColors = {
    positive: 'text-emerald-600',
    negative: 'text-red-600',
    neutral: 'text-slate-500',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${trendColors[trendType]}`}>
           {trend}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
