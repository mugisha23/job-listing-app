import React, { useState, useEffect } from 'react';
import JobBoardComponent from './components/JobBoardComponent'

function App() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState(['CSS']);

  useEffect(() => setJobs(data), []);
  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;
    setFilters([...filters, tag])
  }


  const filterFunc = ({ role, level, tools, languages }) => {
    const tags = [role, level]
    if (filters.length === 0) {
      return true
    }
    if (tools) {
      tags.push(...tools)
    }
    if (languages) {
      tags.push(...languages)
    }

    return tags.some(tag => filters.includes(tag));
  }

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !==
      passedFilter))
  }

  const clearFilters = () => {
    setFilters([])
  }


  const filteredJobs = jobs.filter(filterFunc)


  useEffect(() =>
    setJobs(data)
    , []);

  return (
    <>
      <header className="bg-teal-500 mb-12">
        <img className="w-full"
          src="/images/bg-header-desktop.svg" alt="bg-image" />
      </header>
      <div className="container m-auto">

        {filters.length > 0 && (

          <div className={`flex bg-white
          shadow-md my-16 mb-20 
          mx-10 p-6 rounded z-10 relative
          `}>
            {filters.map((filter) => (
              <span className="cursor-pointer
               font-bold mr-4 mb-4
              rounded text-teal-500 
              bg-teal-100 lg:mb-0" onClick={() =>
                  handleFilterClick(filter)}>

                {filter}
              </span>
            ))}

            <button onClick={clearFilters}
              className="font-bold text-gray-700 ml-auto">
              Clear</button>
          </div>
        )}

        {jobs.length === 0 ? (
          <p>jobs are fetchhing...</p>
        ) : (
            filteredJobs.map((job) => (<JobBoardComponent
              job={job}
              key={job.id}
              handleTagClick={handleTagClick}
            />)
            )
          )

        }
      </div>

    </>
  );
}

export default App;
