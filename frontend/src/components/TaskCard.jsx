import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";

function TaskCard({ task, onDelete, onEdit }) {
  const taskId = String(task.id);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-background rounded-lg p-4 shadow-sm border min-w-fit"
    >
      <div className="mb-3 flex justify-between items-center">
        <p className="font-medium cursor-grab">{task.title}</p>
        <div className="space-x-2" onClick={e => e.stopPropagation()}>
          <Button
            size="xs"
            variant="outline"
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onEdit({ ...task, id: taskId });
            }}
          >
            <SquarePen />
          </Button>
          <Button
            size="xs"
            variant="destructive"
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onDelete(taskId);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
    </div>
  );
}

export default TaskCard;
