import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Filter
} from 'lucide-react';
import { mockTasks } from '../services/mockData';
import { Task, TaskStatus, Priority } from '../types';

const TaskBoard: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  const statusColumns = [
    { id: TaskStatus.New, label: 'New', color: 'bg-slate-100 border-slate-200' },
    { id: TaskStatus.InProgress, label: 'In Progress', color: 'bg-blue-50 border-blue-100' },
    { id: TaskStatus.PendingClient, label: 'Pending Client', color: 'bg-orange-50 border-orange-100' },
    { id: TaskStatus.Review, label: 'Review', color: 'bg-purple-50 border-purple-100' },
    { id: TaskStatus.Completed, label: 'Completed', color: 'bg-green-50 border-green-100' },
  ];

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.High: return 'text-red-600 bg-red-50 ring-red-500/10';
      case Priority.Medium: return 'text-orange-600 bg-orange-50 ring-orange-500/10';
      case Priority.Low: return 'text-blue-600 bg-blue-50 ring-blue-500/10';
      default: return 'text-slate-600 bg-slate-50 ring-slate-500/10';
    }
  };

  const isOverdue = (dateStr: string) => {
      const d = new Date(dateStr);
      const now = new Date();
      return d < now;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Task Management</h2>
          <p className="text-slate-500 mt-1">Track work progress across branches and services.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex space-x-6 min-w-max h-full">
          {statusColumns.map((col) => {
            const tasksInCol = mockTasks.filter(t => t.status === col.id);
            
            return (
              <div key={col.id} className="w-80 flex flex-col h-full rounded-xl bg-slate-50/50 border border-slate-200/60">
                {/* Column Header */}
                <div className={`p-4 border-b ${col.color.replace('bg-', 'border-')} flex justify-between items-center rounded-t-xl bg-white`}>
                  <div className="flex items-center">
                    <h3 className="font-semibold text-slate-800">{col.label}</h3>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                      {tasksInCol.length}
                    </span>
                  </div>
                </div>

                {/* Task List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {tasksInCol.map((task) => (
                    <div 
                      key={task.id} 
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-slate-800 mb-1 leading-tight">{task.title}</h4>
                      <p className="text-xs text-slate-500 mb-3">{task.clientName}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                        <div className="flex items-center space-x-2">
                           <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold" title={task.assignedTo}>
                              {task.assignedTo.charAt(0)}
                           </div>
                           <span className="text-xs text-slate-400">{task.branch}</span>
                        </div>
                        
                        <div className={`flex items-center text-xs ${isOverdue(task.dueDate) && task.status !== TaskStatus.Completed ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {tasksInCol.length === 0 && (
                     <div className="text-center py-8 text-slate-400 text-sm italic">
                        No tasks
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
