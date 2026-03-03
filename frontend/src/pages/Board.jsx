const columns = [
  { key: "todo", title: "Todo" },
  { key: "in-progress", title: "In Progress" },
  { key: "done", title: "Done" },
];

const mockTasks = [
  { id: 1, title: "Setup project", description: "Initialize repository", status: "todo" },
  { id: 2, title: "Design layout", description: "Plan UI structure", status: "todo" },
  { id: 3, title: "Build Dashboard", description: "Integrate project CRUD", status: "in-progress" },
  { id: 4, title: "Setup Auth", description: "Implement JWT flow", status: "done" },
];

function Board() {
  const grouped = columns.reduce((acc, column) => {
    acc[column.key] = mockTasks.filter(task => task.status === column.key);
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
