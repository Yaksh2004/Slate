import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

function Layout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
        <h1 className="text-lg font-semibold">Slate</h1>
        <ModeToggle />
      </div>

      <div className="flex-1 p-6 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
