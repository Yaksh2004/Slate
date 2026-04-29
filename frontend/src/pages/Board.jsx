import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext, DragOverlay, rectIntersection, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { getTasksByProject, deleteTask, updateTask } from "@/services/taskService";
import Column from "@/components/Column";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog";

const columns = [
  { key: "todo", title: "Todo" },
  { key: "in-progress", title: "In Progress" },
  { key: "done", title: "Done" },
];

function Board() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  async function fetchTasks() {
    try {
      const res = await getTasksByProject(projectId);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(taskId) {
    try {
      await deleteTask(projectId, taskId);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
  }

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const taskId = String(active.id);
    const overId = String(over.id);

    let newStatus = null;
    const targetColumn = columns.find(c => c.key === overId);
    if (targetColumn) {
      newStatus = targetColumn.key;
    } else {
      const overTask = tasks.find(t => String(t.id) === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    const task = tasks.find(t => String(t.id) === taskId);
    if (task && newStatus && task.status !== newStatus) {
      // Optimistic update - move immediately in UI
      setTasks(prev => prev.map(t => (String(t.id) === taskId ? { ...t, status: newStatus } : t)));

      try {
        await updateTask(projectId, taskId, { status: newStatus });
      } catch (error) {
        console.log(error);
        fetchTasks(); // revert on error
      }
    }
    setActiveId(null);
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  const grouped = {
    todo: [],
    "in-progress": [],
    done: [],
  };

  tasks.forEach(task => {
    if (grouped[task.status]) {
      grouped[task.status].push(task);
    }
  });

  const activeTask = activeId ? tasks.find(t => String(t.id) === String(activeId)) : null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Project Board</h1>
          <CreateTaskDialog projectId={projectId} fetchTasks={fetchTasks} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-wrap gap-6">
            {columns.map(column => (
              <Column
                key={column.key}
                column={column}
                tasks={grouped[column.key]}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="bg-background rounded-lg p-4 shadow-lg border opacity-80">
                <p className="font-medium">{activeTask.title}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <EditTaskDialog
        task={editingTask}
        projectId={projectId}
        setEditingTask={setEditingTask}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

export default Board;
