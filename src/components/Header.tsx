import type { Filters, SortBy } from "../types";

interface HeaderProps {
  search: string;
  setSearch: (search: string) => void;
  setCreateModalOpen: (value: boolean) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
}

const Header = ({ search, setSearch, setCreateModalOpen, filters, setFilters, sortBy, setSortBy }: HeaderProps) => {
  const sortFields = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'priority', label: 'Priority' },
    { value: 'progress', label: 'Progress' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'updatedAt', label: 'Updated Date [default]' }
  ] as const;

  const handleSortFieldChange = (field: SortBy['field']) => {
    setSortBy({ ...sortBy, field });
  };

  const handleSortDirectionChange = (direction: SortBy['direction']) => {
    setSortBy({ ...sortBy, direction });
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 py-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Task Manager</h1>
            <p className="mt-2 text-lg text-gray-600">Organize and track your tasks efficiently</p>
          </div>
          
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="w-full sm:max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="search" 
                placeholder="Search tasks..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 relative">
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                onClick={() => setFilters({...filters, open: !filters.open})}
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
                Filters
              </button>
              
              <div className="relative">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  onClick={() => setSortBy({...sortBy, open: !sortBy.open})}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Sort By
                  <svg className={`h-4 w-4 ml-2 transition-transform ${sortBy.open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {sortBy.open && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Sort Options</h3>
                      
                      {/* Direction Radio Buttons */}
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">Direction</label>
                        <div className="space-y-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="sortDirection"
                              value="asc"
                              checked={sortBy.direction === "asc"}
                              onChange={() => handleSortDirectionChange("asc")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ascending</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="sortDirection"
                              value="desc"
                              checked={sortBy.direction === "desc"}
                              onChange={() => handleSortDirectionChange("desc")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Descending</span>
                          </label>
                        </div>
                      </div>
                      
                      {/* Field Radio Buttons */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Sort Field</label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {sortFields.map((field) => (
                            <label key={field.value} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="sortField"
                                value={field.value}
                                checked={sortBy.field === field.value}
                                onChange={() => handleSortFieldChange(field.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700">{field.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button 
                className="inline-flex items-center px-6 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                onClick={() => setCreateModalOpen(true)}
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header