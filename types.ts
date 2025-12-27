export enum BranchName {
  Ravulapalem = 'Ravulapalem',
  Atreyapuram = 'Atreyapuram',
  Amalapuram = 'Amalapuram',
  Versatile = 'Versatile',
}

export enum TaskStatus {
  New = 'New',
  InProgress = 'In Progress',
  PendingClient = 'Pending Client',
  Review = 'Review',
  Filed = 'Filed',
  Completed = 'Completed',
}

export enum ServiceType {
  GST = 'GST',
  ITR = 'Income Tax',
  TDS = 'TDS',
  Audit = 'Tax Audit',
  ROC = 'ROC/Company',
  Labour = 'Labour Laws',
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface Client {
  id: string;
  name: string;
  pan: string;
  gstin?: string;
  branch: BranchName;
  contactPerson: string;
  phone: string;
  email: string;
  group?: string;
  status: 'Active' | 'Inactive';
}

export interface Task {
  id: string;
  clientId: string;
  clientName: string; // Denormalized for ease
  branch: BranchName;
  serviceType: ServiceType;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string; // ISO Date string
  assignedTo: string; // Staff name
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  time: string;
  read: boolean;
}

export interface DashboardStats {
  totalClients: number;
  pendingTasks: number;
  overdueTasks: number;
  revenueMTD: number;
}
