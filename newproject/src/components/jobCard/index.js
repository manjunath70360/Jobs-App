import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime, MdBusinessCenter } from "react-icons/md";
import { GiBackwardTime } from "react-icons/gi";
import "./index.css";

const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);


  useEffect(() => {
    if (job?.id) {
      const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
      const jobIsBookmarked = bookmarkedJobs.some(bookmarkedJob => bookmarkedJob.id === job.id);
      setIsBookmarked(jobIsBookmarked);
    }
  }, [job?.id]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (job?.id) {
      const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];

      if (isBookmarked) {
        const updatedBookmarks = bookmarkedJobs.filter(bookmarkedJob => bookmarkedJob.id !== job.id);
        localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
      } else {
        bookmarkedJobs.push(job);
        localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
        setIsBookmarked(true);
      }
    }
  };


  if (!job?.id) return null;

  const role = job?.job_role || 'Role not available';
  const company = job?.company_name || 'Company name not available';
  const place = job?.primary_details?.Place || 'Location not available';
  const salary = job?.primary_details?.Salary || 'Salary not available';
  const thumbUrl = job?.creatives && job.creatives.length > 0
    ? job.creatives[0].thumb_url
    : 'https://res.cloudinary.com/dwwunc51b/image/upload/v1726039394/job-vacancy_i7hrn7.jpg';
  const experience = job?.primary_details?.Experience || 'Experience not available';
  const jobHours = job?.job_hours || 'Not specified';
  const numApplications = job?.num_applications || 'No data';
  const timeAgo = job?.created_on
    ? formatDistanceToNow(new Date(job.created_on), { addSuffix: true })
    : 'Time not available';

  return (
    <div className="job-card">
      <img src={thumbUrl} className='img' alt='job-img' />
      <hr />
      <div className='job-details'>
        <div className='role-com'>
          <h3 className='role'>{role}</h3>
          <p className='company'>{company}</p>
        </div>
        {isBookmarked ? (
          <FaBookmark size={20} className='bookmark-icon bookmarked' onClick={toggleBookmark} />
        ) : (
          <FaRegBookmark size={20} className='bookmark-icon' onClick={toggleBookmark} />
        )}
      </div>
      <div className='icon-con'>
        <FaLocationDot size={16} className='icon'/>
        <p className='loc'>{place}</p>
      </div>
      <div className='icon-con'>
        <HiCurrencyRupee size={16} className='icon'/>
        <p className='loc'>{salary}</p>
      </div>
      <div className='type-con'>
        <div className='job-type-icons'>
          <MdAccessTime className='exp-icon'/>
          <p className='exp'>{jobHours}</p>
        </div>
        <div className='job-type-icons'>
          <MdBusinessCenter className='exp-icon'/>
          <p className='exp'>{experience}</p>
        </div>
      </div>
      <hr/>
      <div className='time-icon-con'>
        <GiBackwardTime className='time-icon'/>
        <p className='time'>{timeAgo} - <span className='views'>{numApplications} Applicants</span></p>
      </div>
    </div>
  );
};

export default JobCard;
