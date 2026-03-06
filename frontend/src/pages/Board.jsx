import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasksByProject } from "@/services/taskService";

const columns = [
  { key: "todo", title: "Todo" },
  { key: "in-progress", title: "In Progress" },
  { key: "done", title: "Done" },
];

function Board() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await getTasksByProject(projectId);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  const grouped = columns.reduce((acc, column) => {
    acc[column.key] = tasks.filter(task => task.status === column.key);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">Project Board</h1>

        <div className="grid grid-cols-3 gap-6">
          {columns.map(column => (
            <div key={column.key} className="rounded-xl bg-muted/40 p-4 flex flex-col">
              <h2 className="font-semibold mb-4">{column.title}</h2>

              <div className="space-y-3">
                {grouped[column.key].map(task => (
                  <div key={task.id} className="bg-background rounded-lg p-4 shadow-sm border">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
