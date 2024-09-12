import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../jobCard/index';
import TopNav from '../top-bottom nav/topNav';
import BottomNav from '../top-bottom nav/bottomNav';
import { MdDelete } from "react-icons/md";
import "./index.css"

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(savedJobs);
  }, []);

  const onClearBookmark = () => {
  
    localStorage.removeItem('bookmarkedJobs');
    setBookmarkedJobs([]); 
  };

  return (
    <div className='bookmark-container'>
      <TopNav />
      <div className='bookmark-icon'>
      <h2 className='title-mark'>Bookmarked Jobs</h2>
      <button onClick={onClearBookmark} className='btn btn-icon'><MdDelete size={20}/> Clear All</button>
      </div>
      {bookmarkedJobs.length === 0 ? (
        <p>No bookmarked jobs available</p>
      ) : (
        <div className='app-body'>
          {bookmarkedJobs.map((job, index) => (
            job?.id ? (
              <Link className="link" to={`/job/${job.id}`} key={`${job.id}-${index}`}>
                <JobCard job={job} />
              </Link>
            ) : (
              <div key={index} className="no-id-job">
                <JobCard job={job} />
                <p style={{ color: 'red' }}>Job ID not available</p>
              </div>
            )
          ))}
        </div>
      )}
   <BottomNav />
    
    </div>
  );
};

export default Bookmarks;
