export interface Deal {
  amount: number;
  dateCreated: Date | null;
  dueDate: Date | null;
  taskName: string;
  status: string;
  startDate: string;
  assignees: string;
  priority: string;
  tags: string;
  taskContent: string;
  [key: string]: string | number | Date | null;
}
