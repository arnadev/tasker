import { useState } from "react";
import type { Filters } from "../types";

const FiltersModal = ({filters, setFilters} : {filters: Filters, setFilters: (filters: Filters) => void}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleSetFilters = () => {
    setFilters({...localFilters, open: false});
  }

  const handleCancel = () => {
    setFilters({...filters, open: false});
  }

  const handleResetFilters = () => {
    setLocalFilters({
        open: true,
        priority: {low: true, medium: true, high: true},
        progress: {lower: 0, higher: 100},
        createdAt: {lower: new Date(0), higher: new Date()},
        updatedAt: {lower: new Date(0), higher: new Date()},
    });
  }

  // Validation functions
  const isProgressValid = localFilters.progress.lower <= localFilters.progress.higher;
  const isCreatedAtValid = localFilters.createdAt.lower <= localFilters.createdAt.higher;
  const isUpdatedAtValid = localFilters.updatedAt.lower <= localFilters.updatedAt.higher;
  const isFormValid = isProgressValid && isCreatedAtValid && isUpdatedAtValid;

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md lg:w-1/2 w-3/4">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Priority</label>
            <label className="flex items-center mr-4 cursor-pointer">
              <input type='checkbox' checked={localFilters.priority.low} className="border rounded p-2 mr-2" onChange={(e) => setLocalFilters({
                ...localFilters,
                priority: {...localFilters.priority, low: e.target.checked}
              })}/>
              <span>Low</span>
            </label>
            <label className="flex items-center mr-4 cursor-pointer">
              <input type='checkbox' checked={localFilters.priority.medium} className="border rounded p-2 mr-2" onChange={(e) => setLocalFilters({
                ...localFilters,
                priority: {...localFilters.priority, medium: e.target.checked}
              })}/>
              <span>Medium</span>
            </label>
            <label className="flex items-center mr-4 cursor-pointer">
              <input type='checkbox' checked={localFilters.priority.high} className="border rounded p-2 mr-2" onChange={(e) => setLocalFilters({
                ...localFilters,
                priority: {...localFilters.priority, high: e.target.checked}
              })}/>
              <span>High</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Progress</label>
            <div className="mb-2">
              <span className="text-sm">Lower Bound: {localFilters.progress.lower}%</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={localFilters.progress.lower}
                onChange={(e) => setLocalFilters({
                  ...localFilters, 
                  progress: {...localFilters.progress, lower: parseInt(e.target.value)}
                })}
                className="w-full" 
              />
            </div>
            <div className="mb-2">
              <span className="text-sm">Upper Bound: {localFilters.progress.higher}%</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={localFilters.progress.higher}
                onChange={(e) => setLocalFilters({
                  ...localFilters, 
                  progress: {...localFilters.progress, higher: parseInt(e.target.value)}
                })}
                className="w-full" 
              />
            </div>
            {!isProgressValid && (
              <span className="text-red-500 text-sm">Lower Bound must be less than or equal to Upper Bound</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Created At</label>
            <div className="mb-2">
              <span className="text-sm block mb-1">Lower Bound</span>
              <input 
                type="date" 
                value={localFilters.createdAt.lower.toISOString().split('T')[0]}
                onChange={(e) => setLocalFilters({
                  ...localFilters, 
                  createdAt: {...localFilters.createdAt, lower: new Date(e.target.value)}
                })}
                className="border rounded p-2 w-full" 
              />
            </div>
            <div className="mb-2">
              <span className="text-sm block mb-1">Upper Bound</span>
              <input 
                type="date" 
                value={localFilters.createdAt.higher.toISOString().split('T')[0]}
                onChange={(e) => setLocalFilters({
                  ...localFilters, 
                  createdAt: {...localFilters.createdAt, higher: new Date(e.target.value)}
                })}
                className="border rounded p-2 w-full" 
              />
            </div>
            {!isCreatedAtValid && (
              <span className="text-red-500 text-sm">Lower Bound must be less than or equal to Upper Bound</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Updated At</label>
            <div className="mb-2">
              <span className="text-sm block mb-1">Lower Bound</span>
              <input 
                type="date" 
                value={localFilters.updatedAt.lower.toISOString().split('T')[0]}
                onChange={(e) => setLocalFilters({
                  ...localFilters, 
                  updatedAt: {...localFilters.updatedAt, lower: new Date(e.target.value)}
                })}
                className="border rounded p-2 w-full" 
              />
            </div>
            <div className="mb-2">
              <span className="text-sm block mb-1">Upper Bound</span>
              <input 
                type="date" 
                value={localFilters.updatedAt.higher.toISOString().split('T')[0]}
                onChange={(e) => setLocalFilters({
                  ...localFilters, 
                  updatedAt: {...localFilters.updatedAt, higher: new Date(e.target.value)}
                })}
                className="border rounded p-2 w-full" 
              />
            </div>
            {!isUpdatedAtValid && (
              <span className="text-red-500 text-sm">Lower Bound must be less than or equal to Upper Bound</span>
            )}
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 cursor-pointer" onClick={handleResetFilters}>Reset</button>
            <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 cursor-pointer" onClick={handleCancel}>Cancel</button>
            <button type="button" disabled={!isFormValid} className={`px-4 py-2 rounded ${isFormValid ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={() => {
                if (isFormValid) handleSetFilters();
              }}
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FiltersModal