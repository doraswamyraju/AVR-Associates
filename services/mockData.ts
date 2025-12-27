import { BranchName, Client, Priority, ServiceType, Task, TaskStatus, Notification } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockClients: Client[] = [
  { id: 'c1', name: 'Srinivasa Traders', pan: 'ABCDE1234F', gstin: '37ABCDE1234F1Z5', branch: BranchName.Ravulapalem, contactPerson: 'Ravi Kumar', phone: '9876543210', email: 'ravi@srinivasa.com', status: 'Active' },
  { id: 'c2', name: 'Krishna Tech Solutions', pan: 'FGHIJ5678K', branch: BranchName.Versatile, contactPerson: 'Krishna M', phone: '9988776655', email: 'info@krishnatech.in', status: 'Active' },
  { id: 'c3', name: 'Godavari Exports', pan: 'KLMNO9012P', gstin: '37KLMNO9012P1Z9', branch: BranchName.Amalapuram, contactPerson: 'Suresh Reddy', phone: '9123456789', email: 'suresh@godavari.ex', status: 'Active' },
  { id: 'c4', name: 'Atreya Foods', pan: 'PQRST3456U', branch: BranchName.Atreyapuram, contactPerson: 'Lakshmi N', phone: '9000011111', email: 'accounts@atreyafoods.com', status: 'Active' },
  { id: 'c5', name: 'Venkateswara Motors', pan: 'VWXYZ7890A', gstin: '37VWXYZ7890A1Z2', branch: BranchName.Ravulapalem, contactPerson: 'Venkatesh', phone: '8888899999', email: 'venky@vmotors.com', status: 'Inactive' },
];

const services = [ServiceType.GST, ServiceType.ITR, ServiceType.TDS, ServiceType.Audit, ServiceType.ROC];
const statuses = [TaskStatus.New, TaskStatus.InProgress, TaskStatus.PendingClient, TaskStatus.Review, TaskStatus.Filed, TaskStatus.Completed];
const priorities = [Priority.High, Priority.Medium, Priority.Low];
const staff = ['Anil Kumar', 'Priya S', 'Rajesh V', 'Sneha M', 'Partner'];

export const mockTasks: Task[] = Array.from({ length: 35 }).map((_, i) => {
  const client = mockClients[i % mockClients.length];
  const service = services[i % services.length];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Create some overdue dates
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + (Math.random() > 0.3 ? Math.floor(Math.random() * 20) : -Math.floor(Math.random() * 5)));

  return {
    id: generateId(),
    clientId: client.id,
    clientName: client.name,
    branch: client.branch,
    serviceType: service,
    title: `${service} Filing - ${client.name}`,
    status: status,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    dueDate: dueDate.toISOString().split('T')[0],
    assignedTo: staff[Math.floor(Math.random() * staff.length)],
    updatedAt: new Date().toISOString(),
  };
});

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'GST Deadline Approaching', message: 'GSTR-3B due date is in 3 days.', type: 'warning', time: '2 hrs ago', read: false },
  { id: 'n2', title: 'New Client Added', message: 'Srinivasa Traders added to Ravulapalem branch.', type: 'success', time: '5 hrs ago', read: false },
  { id: 'n3', title: 'Task Overdue', message: 'ITR Filing for Godavari Exports is overdue.', type: 'error', time: '1 day ago', read: true },
];

export const getStats = () => {
  return {
    totalClients: mockClients.length,
    pendingTasks: mockTasks.filter(t => t.status !== TaskStatus.Completed && t.status !== TaskStatus.Filed).length,
    overdueTasks: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== TaskStatus.Completed).length,
    revenueMTD: 450000, // Mock revenue
  };
};
