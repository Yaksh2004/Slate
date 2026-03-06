import { useState, useEffect } from "react";
import { updateTask } from "@/services/taskService";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditTaskDialog({ task, projectId, setEditingTask, fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateTask(projectId, task.id, {
        title,
        description,
      });

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={!!task} onOpenChange={() => setEditingTask(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />

          <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Task description" />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditingTask(null)}>
              Cancel
            </Button>

            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskDialog;
