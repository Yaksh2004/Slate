import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "@/services/projectService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createProject({ name });
      setName("");
      setOpen(false);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>New Project</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Project name" required />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
