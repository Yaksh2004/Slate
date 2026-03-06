import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Project Board</h1>
          <CreateTaskDialog projectId={projectId} fetchTasks={fetchTasks} />
        </div>

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
