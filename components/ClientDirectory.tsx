import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, MoreHorizontal, Download, Phone, Mail } from 'lucide-react';
import { mockClients } from '../services/mockData';
import { BranchName } from '../types';

const ClientDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('All');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.pan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === 'All' || client.branch === branchFilter;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Client Directory</h2>
          <p className="text-slate-500 mt-1">Manage clients across all branches.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium shadow-sm transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <Link 
            to="/onboarding"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by Name, PAN, or GSTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 border border-slate-300 rounded-lg px-3 py-2 bg-slate-50">
             <Filter className="h-4 w-4 text-slate-500" />
             <select 
               className="bg-transparent border-none text-sm font-medium text-slate-700 focus:outline-none pr-4"
               value={branchFilter}
               onChange={(e) => setBranchFilter(e.target.value)}
             >
               <option value="All">All Branches</option>
               {Object.values(BranchName).map(b => (
                 <option key={b} value={b}>{b}</option>
               ))}
             </select>
          </div>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Client Name / ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  PAN / GSTIN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                           {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{client.name}</div>
                          <div className="text-xs text-slate-500">ID: #{client.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{client.contactPerson}</div>
                      <div className="text-xs text-slate-500 flex items-center mt-0.5">
                        <Phone className="h-3 w-3 mr-1" /> {client.phone}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center mt-0.5">
                        <Mail className="h-3 w-3 mr-1" /> {client.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                        {client.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm text-slate-700 font-mono">{client.pan}</div>
                       {client.gstin && <div className="text-xs text-slate-500 font-mono mt-0.5">{client.gstin}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.status === 'Active' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No clients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
           <span className="text-sm text-slate-500">Showing {filteredClients.length} entries</span>
           <div className="flex space-x-2">
              <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-white disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-white">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDirectory;
