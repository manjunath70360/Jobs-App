import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../jobCard';

import TopNav from '../top-bottom nav/topNav';
import BottomNav from '../top-bottom nav/bottomNav';

import "./index.css"

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
       console.log(response)
        setJobs((prevJobs) => [...prevJobs, ...response.data.results
            
        ]);
      } catch (error) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return (
    <div className='app'>
    <div className='app-container'>
    <TopNav />
      
     <div className='app-body'>
     {jobs.map((job, index) => (
        <Link className="link" to={`/job/${job.id}`} key={`${job.id}-${index}`}>
          <JobCard job={job} />
        </Link>
      ))}
     </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && <button onClick={loadMore} className='btn'>Load More</button>}
    </div>
<BottomNav/>
    </div>
  );
};

export default Jobs;
