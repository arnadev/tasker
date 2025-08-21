import { useState, useEffect } from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import CreateTaskModal from "./components/CreateTaskModal";
import FiltersModal from "./components/FiltersModal";
import TaskDetailModal from "./components/TaskDetailModal";

import type { Filters, Task, SortBy} from "./types";

const App = () => {
  // Initialize tasks by loading from localStorage immediately
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert date strings back to Date objects
        return parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }));
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>({
    open: false,
    field: 'updatedAt',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<Filters>({
    open: false,
    priority: {low: true, medium: true, high: true},
    progress: {lower: 0, higher: 100},
    createdAt: {lower: new Date(0), higher: new Date()},
    updatedAt: {lower: new Date(0), higher: new Date()},
  });
  const [taskDetail, setTaskDetail] = useState<Task | null>(null);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    
    // Reset filters to show all tasks including the newly created one
    setFilters({
      open: false,
      priority: {low: true, medium: true, high: true},
      progress: {lower: 0, higher: 100},
      createdAt: {lower: new Date(0), higher: new Date()},
      updatedAt: {lower: new Date(0), higher: new Date()},
    });
    
    // Also clear search to ensure new task is visible
    setSearch("");
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    
    // Update the taskDetail state if it's the same task being viewed
    if (taskDetail && taskDetail.id === updatedTask.id) {
      setTaskDetail(updatedTask);
    }
 
    // Reset filters to show all tasks including the newly created one
    setFilters({
      open: false,
      priority: {low: true, medium: true, high: true},
      progress: {lower: 0, higher: 100},
      createdAt: {lower: new Date(0), higher: new Date()},
      updatedAt: {lower: new Date(0), higher: new Date()},
    });
    
    // Also clear search to ensure new task is visible
    setSearch("");
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  return (
    <div>{!createModalOpen && !filters.open && !taskDetail && (
      <Header search={search} setSearch={setSearch} setCreateModalOpen={setCreateModalOpen} filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy}/>
      )}
      <main className="max-w-7xl mx-auto">
        <Tasks tasks={tasks} search={search} filters={filters} sortBy={sortBy} setTaskDetail={setTaskDetail}/>
      </main>
      {createModalOpen && <CreateTaskModal setCreateModalOpen={setCreateModalOpen} handleCreateTask={handleCreateTask}/>}
      {filters.open && <FiltersModal filters={filters} setFilters={setFilters}/>}
      {taskDetail && <TaskDetailModal taskDetail={taskDetail} setTaskDetail={setTaskDetail} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask}/>}
    </div>
  )
}

export default App