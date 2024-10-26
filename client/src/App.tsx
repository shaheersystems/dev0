import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <div className="dark">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-2 dark:bg-zinc-950">
          <SidebarTrigger />
          <div className="w-full max-w-2xl p-4 mx-auto bg-gray-500"></div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
