import { GripVertical } from 'lucide-react';
import type { Task } from '../../types';
import './TasksSection.css';

interface TasksSectionProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

const STATUS_CONFIG = {
  pending:     { label: 'Pending',     color: '#FFB31F' },
  'in-progress': { label: 'In Progress', color: '#4DA6FF' },
  completed:   { label: 'Completed',   color: '#CAD429' },
};

const AVATAR_COLORS = ['#FF6B6B', '#4DA6FF', '#CAD429', '#FFB31F', '#E91E8C'];

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const status = STATUS_CONFIG[task.status];

  return (
    <div className={`task-row ${task.isCompleted ? 'task-row--done' : ''}`}>
      <GripVertical size={14} className="task-row__drag" />
      <input
        type="checkbox"
        className="task-row__checkbox"
        checked={task.isCompleted}
        onChange={onToggle}
      />
      <span className="task-row__title">{task.title}</span>
      <span className="task-row__due">Due Date : <strong>{task.dueDate}</strong></span>
      <div className="task-row__avatars">
        {task.assignees.slice(0, 3).map((_, i) => (
          <div
            key={i}
            className="task-row__avatar"
            style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length], zIndex: 3 - i }}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      <div className="task-row__status">
        <span className="task-row__status-dot" style={{ background: status.color }} />
        <span className="task-row__status-text" style={{ color: status.color }}>{status.label}</span>
        <span className="task-row__status-arrow">▾</span>
      </div>
    </div>
  );
}

export default function TasksSection({ tasks, onToggleTask }: TasksSectionProps) {
  return (
    <div className="tasks-section">
      <div className="tasks-section__header">
        <h2 className="tasks-section__title">Tasks</h2>
        <select className="tasks-section__filter">
          <option>All Projects</option>
          <option>My Tasks</option>
        </select>
      </div>
      <div className="tasks-section__list">
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
