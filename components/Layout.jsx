import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Bell, 
  Search, 
  Menu,
  X,
  Building2,
  LogOut,
  Settings
} from 'lucide-react';
import { mockNotifications } from '../services/mockData';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  const getPageTitle = () => {
    const current = navItems.find(item => location.pathname.includes(item.path));
    return current ? current.label : 'AVR Associates';
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
            <Building2 className="h-8 w-8 text-blue-500 mr-2" />
            <span className="font-bold text-xl tracking-tight">AVR ERP</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 rounded-lg transition-colors group
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                `}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-800">
            <button className="flex items-center w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors mb-1">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
            <button className="flex items-center w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
          
          <div className="p-4 text-xs text-slate-500 text-center">
             v2.4.0 • AVR Associates
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 mr-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search clients, tasks..."
                className="w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 font-semibold text-slate-700 text-sm flex justify-between">
                    <span>Notifications</span>
                    <button onClick={() => setShowNotifications(false)}>
                        <X className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-slate-100 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                         <p className="text-sm font-medium text-slate-800">{n.title}</p>
                         <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                         <p className="text-[10px] text-slate-400 mt-2 text-right">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-slate-100">
                      <button className="text-xs text-blue-600 font-medium hover:text-blue-800">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                FA
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-800 leading-none">Firm Admin</p>
                <p className="text-xs text-slate-500 mt-1">AVR Head Office</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
