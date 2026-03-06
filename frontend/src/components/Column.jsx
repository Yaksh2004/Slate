import TaskCard from "./TaskCard";

function Column({ column, tasks, onDelete, onEdit }) {
  return (
    <div className="rounded-xl bg-muted/40 p-4 min-w-xs flex-1">
      <h2 className="font-semibold text-lg mb-4">{column.title}</h2>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}

export default Column;
