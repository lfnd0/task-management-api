export type CreateTaskDTO = {
  userId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  start_at: Date;
  end_at: Date;
};

export type TaskCreatedDTO = {
  id: string;
  created_at: Date;
  updated_at: Date | null;
} & CreateTaskDTO;
