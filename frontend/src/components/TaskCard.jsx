import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";

function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-background rounded-lg p-4 shadow-sm border min-w-fit">
      <div className="mb-3 flex justify-between items-center">
        <p className="font-medium">{task.title}</p>
        <div className="space-x-2 ">
          <Button size="xs" variant="outline" className="cursor-pointer" onClick={() => onEdit(task)}>
            <SquarePen />
          </Button>
          <Button size="xs" variant="destructive" className="cursor-pointer" onClick={() => onDelete(task.id)}>
            <Trash2 />
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
    </div>
  );
}

export default TaskCard;
