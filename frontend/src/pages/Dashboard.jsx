import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "@/services/projectService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Dashboard</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">New Project</Button>
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
        </div>

        <div className="grid gap-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border bg-muted/40 p-4 hover:bg-muted transition"
            >
              <span className="cursor-pointer font-medium" onClick={() => navigate(`/projects/${project.id}`)}>
                {project.name}
              </span>

              <Button
                className="cursor-pointer"
                variant="destructive"
                size="xs"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
