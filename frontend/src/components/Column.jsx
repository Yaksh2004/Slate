import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

function Column({ column, tasks, onDelete, onEdit }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl bg-muted/40 p-4 min-w-xs flex-1 transition-colors ${
        isOver ? "bg-muted/60 ring-2 ring-primary" : ""
      }`}
    >
      <h2 className="font-semibold text-lg mb-4">{column.title}</h2>

      <div className="space-y-3 min-h-50">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
