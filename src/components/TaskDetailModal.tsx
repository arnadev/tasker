import { useState, useRef } from 'react';
import type {Task} from '../types';

const TaskDetailModal = ({taskDetail, setTaskDetail, handleUpdateTask, handleDeleteTask}: {taskDetail: Task | null, setTaskDetail: (task: Task | null) => void, handleUpdateTask: (task: Task) => void, handleDeleteTask: (taskId: string) => void}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  if (!taskDetail) return null;

  const handleSave = () => {
    if (!titleRef.current || !descriptionRef.current || !priorityRef.current || !progressRef.current) {
      console.error('Form refs not available');
      return;
    }

    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const priority = priorityRef.current.value as 'low' | 'medium' | 'high';
    const progress = parseInt(progressRef.current.value);

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

    if (isNaN(progress) || progress < 0 || progress > 100) {
      alert('Progress must be a number between 0 and 100');
      progressRef.current.focus();
      return;
    }

    // Create updated task object
    const updatedTask: Task = {
      ...taskDetail,
      title,
      description,
      priority,
      progress,
      updatedAt: new Date()
    };

    // Call the handler function
    handleUpdateTask(updatedTask);
    
    // Exit edit mode
    setIsEditMode(false);
  };

  const handleReset = () => {
    // Reset form fields to original values
    if (titleRef.current) titleRef.current.value = taskDetail.title;
    if (descriptionRef.current) descriptionRef.current.value = taskDetail.description;
    if (priorityRef.current) priorityRef.current.value = taskDetail.priority;
    if (progressRef.current) progressRef.current.value = taskDetail.progress.toString();
    
    // Exit edit mode
    setIsEditMode(false);
  };

  const enterEditMode = () => {
    setIsEditMode(true);
    // Set initial values when entering edit mode
    setTimeout(() => {
      if (titleRef.current) titleRef.current.value = taskDetail.title;
      if (descriptionRef.current) descriptionRef.current.value = taskDetail.description;
      if (priorityRef.current) priorityRef.current.value = taskDetail.priority;
      if (progressRef.current) progressRef.current.value = taskDetail.progress.toString();
    }, 0);
  };

  const deleteTask = () => {
    if (!taskDetail) return;
    
    // Show confirmation alert
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the task "${taskDetail.title}"?\n\nThis action cannot be undone.`
    );
    
    // If user clicks "No" or cancels, just return
    if (!confirmDelete) {
      return;
    }
    
    // If user clicks "Yes", proceed with deletion
    handleDeleteTask(taskDetail.id);
    setTaskDetail(null);
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex justify-between items-start">
            {isEditMode ? (
              <input 
                ref={titleRef}
                type="text"
                className="text-2xl font-bold text-gray-900 pr-4 bg-transparent border-b-2 border-blue-500 focus:outline-none min-w-0 flex-1"
                defaultValue={taskDetail.title}
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900 pr-4 break-words min-w-0 flex-1">{taskDetail.title}</h2>
            )}
            <button 
              onClick={() => setTaskDetail(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 -mr-2 -mt-2 flex-shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            {isEditMode ? (
              <textarea 
                ref={descriptionRef}
                className="w-full text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-2 border-blue-500 focus:outline-none resize-none"
                rows={6}
                defaultValue={taskDetail.description}
                placeholder="Enter task description..."
              />
            ) : (
              <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="whitespace-pre-wrap break-words">
                  {taskDetail.description || "No description provided"}
                </p>
              </div>
            )}
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Priority</h4>
              {isEditMode ? (
                <select 
                  ref={priorityRef}
                  className="w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none bg-white"
                  defaultValue={taskDetail.priority}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              ) : (
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  taskDetail.priority === 'high' ? 'bg-red-100 text-red-800' :
                  taskDetail.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {taskDetail.priority}
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Progress</h4>
              {isEditMode ? (
                <div className="space-y-2">
                  <input 
                    ref={progressRef}
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none"
                    defaultValue={taskDetail.progress}
                  />
                  <div className="text-sm text-gray-600">Progress percentage (0-100)</div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${taskDetail.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{taskDetail.progress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Created At</h4>
              <p className="text-gray-900 font-medium">{taskDetail.createdAt.toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm">{taskDetail.createdAt.toLocaleTimeString()}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Updated At</h4>
              <p className="text-gray-900 font-medium">{taskDetail.updatedAt.toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm">{taskDetail.updatedAt.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-lg">
          <div className="flex justify-end space-x-3">
            {isEditMode ? (
              <>
                <button 
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Reset
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={enterEditMode}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask()}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setTaskDetail(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailModal