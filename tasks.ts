// Define the shape of one task
import type {Task} from './src/types/index';


const tasks: Task[] = [
  {
    id: "1",
    title: "Finish React project",
    description: "Complete the task manager app with CRUD features aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    priority: "high",
    progress: 60,
    createdAt: new Date("2025-08-10"),
    updatedAt: new Date("2025-08-18"),
  },
  {
    id: "2",
    title: "Read TypeScript handbook",
    description: "Cover basic typing, generics, and utility types",
    priority: "medium",
    progress: 40,
    createdAt: new Date("2025-08-11"),
    updatedAt: new Date("2025-08-17"),
  },
  {
    id: "3",
    title: "Workout session",
    description: "Go for a 5km run and stretch afterwards",
    priority: "low",
    progress: 100,
    createdAt: new Date("2025-08-12"),
    updatedAt: new Date("2025-08-12"),
  },
  {
    id: "4",
    title: "Write blog post",
    description: "Draft article on learning Tailwind CSS",
    priority: "medium",
    progress: 20,
    createdAt: new Date("2025-08-13"),
    updatedAt: new Date("2025-08-18"),
  },
  {
    id: "5",
    title: "Prepare presentation",
    description: "Slides for team meeting about app progress",
    priority: "high",
    progress: 75,
    createdAt: new Date("2025-08-14"),
    updatedAt: new Date("2025-08-18"),
  },
  {
    id: "6",
    title: "Clean workspace",
    description: "Organize desk and remove clutter",
    priority: "low",
    progress: 10,
    createdAt: new Date("2025-08-15"),
    updatedAt: new Date("2025-08-16"),
  },
  {
    id: "7",
    title: "Watch tutorial",
    description: "Check YouTube series on Zustand state management",
    priority: "low",
    progress: 50,
    createdAt: new Date("2025-08-15"),
    updatedAt: new Date("2025-08-18"),
  },
  {
    id: "8",
    title: "Fix backend bug",
    description: "Resolve login API error in Node.js server",
    priority: "high",
    progress: 30,
    createdAt: new Date("2025-08-16"),
    updatedAt: new Date("2025-08-19"),
  },
  {
    id: "9",
    title: "Update resume",
    description: "Add recent projects and internship details",
    priority: "medium",
    progress: 90,
    createdAt: new Date("2025-08-17"),
    updatedAt: new Date("2025-08-19"),
  },
  {
    id: "10",
    title: "Buy groceries",
    description: "Milk, bread, eggs, and vegetables",
    priority: "low",
    progress: 100,
    createdAt: new Date("2025-08-18"),
    updatedAt: new Date("2025-08-18"),
  },
];

export {
    tasks
}
