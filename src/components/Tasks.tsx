import { useMemo } from 'react';
import type {Filters, Task, SortBy} from '../types';

const Tasks = ({tasks, search, filters, sortBy, setTaskDetail}: {tasks: Task[], search: string, filters: Filters, sortBy: SortBy, setTaskDetail: (task: Task) => void}) => {

    // Filter and sort tasks using useMemo - will recalculate when any dependency changes
    const sortedTasks = useMemo(() => {
        // First filter
        const filtered = tasks.filter(task => {
            const searchTerm = search.trim().toLowerCase();
            if (searchTerm && !(task.title.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm))) {
                return false;
            }

            if(filters.priority[task.priority]===false) return false;
            if (task.progress < filters.progress.lower || task.progress > filters.progress.higher) return false;
            if (task.createdAt < filters.createdAt.lower || task.createdAt > filters.createdAt.higher) return false;
            if (task.updatedAt < filters.updatedAt.lower || task.updatedAt > filters.updatedAt.higher) return false;

            return true;
        });

        // Then sort
        return filtered.sort((a, b) => {
            const fieldA = a[sortBy.field];
            const fieldB = b[sortBy.field];

            if(sortBy.field === 'priority') {
                const priorityOrder = { low: 1, medium: 2, high: 3 };
                const priorityA = fieldA as 'low' | 'medium' | 'high';
                const priorityB = fieldB as 'low' | 'medium' | 'high';
                const orderA = priorityOrder[priorityA];
                const orderB = priorityOrder[priorityB];
                return sortBy.direction === "asc" ? orderA - orderB : orderB - orderA;
            }
            if (fieldA < fieldB) return sortBy.direction === "asc" ? -1 : 1;
            if (fieldA > fieldB) return sortBy.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [tasks, search, filters, sortBy]); // All dependencies automatically handled

    return (
        <div className="w-full p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="w-3/10 md:w-1/5 px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-4 lg:px-6">Title</th>
                            <th className="w-3/10 md:w-2/5 px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-4 lg:px-6">Description</th>
                            <th className="w-1/5 md:w-1/6 px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-4 lg:px-6">Priority</th>
                            <th className="w-1/5 md:w-1/6 px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-4 lg:px-6">Progress</th>
                            <th className="hidden md:table-cell w-1/5 px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider lg:px-6">Created</th>
                            <th className="hidden lg:table-cell w-1/5 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedTasks.map(task => (
                            <tr 
                                key={task.id} 
                                className={`cursor-pointer transition-colors duration-150 ${
                                    task.progress === 100 
                                        ? 'bg-blue-200 hover:bg-blue-300' 
                                        : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setTaskDetail(task)}
                            >
                                <td className="px-3 py-3 text-sm font-medium text-gray-900 md:px-4 lg:px-6 md:py-4">
                                    <div className="line-clamp-3 md:truncate">
                                        {task.title}
                                    </div>
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-700 md:px-4 lg:px-6 md:py-4">
                                    <div className="line-clamp-2 md:truncate">
                                        {task.description}
                                    </div>
                                </td>
                                <td className="px-3 py-3 text-sm md:px-4 lg:px-6 md:py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-sm md:px-4 lg:px-6 md:py-4">
                                    {/* Mobile: Vertical Progress Bar */}
                                    <div className="flex items-center justify-center md:hidden">
                                        <div className="flex flex-col items-center space-y-1">
                                            <div className="w-2 h-12 bg-gray-200 rounded-full overflow-hidden flex flex-col justify-end">
                                                <div 
                                                    className="bg-blue-500 w-full rounded-full transition-all duration-300"
                                                    style={{ height: `${Math.min(100, Math.max(0, task.progress))}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">{task.progress}%</span>
                                        </div>
                                    </div>
                                    
                                    {/* Desktop: Horizontal Progress Bar */}
                                    <div className="hidden md:flex items-center space-x-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className="bg-blue-500 h-full rounded-full"
                                                style={{ width: `${Math.min(100, Math.max(0, task.progress))}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 w-8 text-right">{task.progress}%</span>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-700 lg:px-6">
                                    {task.createdAt.toLocaleDateString()}
                                </td>
                                <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-700">
                                    {task.updatedAt.toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tasks