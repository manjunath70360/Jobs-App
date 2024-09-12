import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MdAccessTime } from "react-icons/md";
import axios from 'axios';
import TopNav from '../top-bottom nav/topNav';
import BottomNav from '../top-bottom nav/bottomNav';

import "./index.css";

const JobDetails = ({ match }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); 

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get('https://testapi.getlokalapp.com/common/jobs?page=1');
        const jobId = Number(match.params.id);
        const jobDetails = response.data.results.find((job) => job.id === jobId);
        setJob(jobDetails);

     
        const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        const jobIsBookmarked = bookmarkedJobs.some((bookmarkedJob) => bookmarkedJob.id === jobId);
        setIsBookmarked(jobIsBookmarked); 
      } catch (error) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [match.params.id]);

  const handleBookmark = () => {
    const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];

    if (isBookmarked) {
      
      const updatedBookmarks = bookmarkedJobs.filter((bookmarkedJob) => bookmarkedJob.id !== job.id);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
    
      bookmarkedJobs.push(job);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
      setIsBookmarked(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const role = job?.job_role || 'Role not available';
  const company = job?.company_name || 'Company name not available';
  const place = job.primary_details?.Place || 'Location not available';
  const salary = job.primary_details?.Salary || 'Salary not available';
  const thumbUrl = job.creatives[0]?.thumb_url || 'https://res.cloudinary.com/dwwunc51b/image/upload/v1726039394/job-vacancy_i7hrn7.jpg';
  const experience = job.primary_details?.Experience || 'Experience not available';

  const timeAgo = job.created_on ? formatDistanceToNow(new Date(job.created_on), { addSuffix: true }) : 'Time not available';

  return (
    <div className='bg-container'>
      <TopNav />
      <h1 className='titles'>Job Details</h1>
      <div className='job-details-container'>
        <img src={thumbUrl} className='banner' alt='company-img' />
        <div className='time-icons'>
          <MdAccessTime className='exp-icon' />
          <p className='exp'>{timeAgo} <strong>By Admin</strong></p>
        </div>
        <h2 className='title'>{job.title}</h2>
        <div className='text_info'>
          <p className='info'><strong>Job Role:</strong> {role}</p>
          <p className='info'><strong>Qualification:</strong> {job.primary_details.Qualification}</p>
          <p className='info'><strong>Experience:</strong> {experience}</p>
          <p className='info'><strong>Company:</strong> {company}</p>
          <p className='info'><strong>Location:</strong> {place}</p>
          <p className='info'><strong>Salary:</strong> {salary}</p>
          <p className='infos'><strong>Description:</strong> {job.title}</p>
        </div>
        
        <button className='btn' onClick={handleBookmark}>
          {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default JobDetails;
