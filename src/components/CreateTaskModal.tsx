import { useRef } from 'react';
import type {Task} from '../types';

const CreateTaskModal = ({setCreateModalOpen, handleCreateTask} : {setCreateModalOpen: (value: boolean) => void; handleCreateTask: (task: Task) => void;}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);

  const collectFormDataAndCreate = () => {
    if (!titleRef.current || !descriptionRef.current || !priorityRef.current) {
      console.error('Form refs not available');
      return;
    }

    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const priority = priorityRef.current.value as 'low' | 'medium' | 'high';

    // Basic validation
    if (!title) {
      alert('Please enter a task title');
      titleRef.current.focus();
      return;
    }

    if (!description) {
      alert('Please enter a task description');
      descriptionRef.current.focus();
      return;
    }

    // Create new task object
    const newTask: Task = {
      id: Date.now().toString(), // Simple ID generation
      title,
      description,
      priority,
      progress: 0, // New tasks start at 0% progress
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Call the handler function
    handleCreateTask(newTask);
    
    // Close the modal
    setCreateModalOpen(false);
  };
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
            <button 
              onClick={() => setCreateModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="px-6 py-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                ref={titleRef}
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter task title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                ref={descriptionRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows={4}
                placeholder="Enter task description..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select 
                ref={priorityRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onClick={() => setCreateModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              onClick={collectFormDataAndCreate}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal