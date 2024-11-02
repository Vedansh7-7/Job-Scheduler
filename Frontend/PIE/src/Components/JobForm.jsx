import React, { useState } from 'react';

function JobForm({ onAddJob }) {
  const [job, setJob] = useState({ name: '', processingTime: '', deadline: '', slack: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.name && job.processingTime) {
      onAddJob({ ...job, processingTime: parseInt(job.processingTime, 10), deadline: parseInt(job.deadline, 10), slack: parseInt(job.slack, 10) });
      setJob({ name: '', processingTime: '', deadline: '', slack: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Job Name" value={job.name} onChange={handleChange} required />
      <input type="number" name="processingTime" placeholder="Processing Time" value={job.processingTime} onChange={handleChange} required />
      <input type="number" name="deadline" placeholder="Deadline" value={job.deadline} onChange={handleChange} />
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
