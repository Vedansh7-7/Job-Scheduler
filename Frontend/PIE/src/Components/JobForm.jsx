import React, { useState, useEffect } from 'react';

function JobForm({ 
  onAddJob, 
  jobIndex, 
  jobCount, 
  processingTimeRandom, 
  processingRange, 
  dueDateRandom, 
  dueDateMultiplier 
}) {
  const [job, setJob] = useState({ name: '', processingTime: '', dueDate: '' });
  const [totalProcessingTime, setTotalProcessingTime] = useState(0);

  // Generate random processing time if required
  useEffect(() => {
    if (processingTimeRandom) {
      const randomProcessingTime = Math.floor(
        Math.random() * (processingRange.max - processingRange.min + 1)
      ) + processingRange.min;

      setJob((prev) => ({ ...prev, processingTime: randomProcessingTime }));
      setTotalProcessingTime((prev) => prev + randomProcessingTime);
    } else {
      setJob((prev) => ({ ...prev, processingTime: '' }));
    }
  }, [processingTimeRandom, processingRange]);

  // Generate random due date if required
  useEffect(() => {
    if (dueDateRandom && totalProcessingTime > 0) {
      const randomDueDate = Math.floor(
        Math.random() * 
        ((totalProcessingTime * dueDateMultiplier.b) - (totalProcessingTime * dueDateMultiplier.a) + 1)
      ) + (totalProcessingTime * dueDateMultiplier.a);

      setJob((prev) => ({ ...prev, dueDate: randomDueDate }));
    } else {
      setJob((prev) => ({ ...prev, dueDate: '' }));
    }
  }, [dueDateRandom, totalProcessingTime, dueDateMultiplier]);

  // Handle input change for job details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.name && (job.processingTime || processingTimeRandom)) {
      onAddJob({
        ...job,
        processingTime: parseInt(job.processingTime, 10),
        dueDate: parseInt(job.dueDate, 10),
      });
      setJob({ name: '', processingTime: '', dueDate: '' }); // Reset form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Job {jobIndex + 1} of {jobCount}</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Job Name"
        value={job.name}
        onChange={handleChange}
        required
      />
      
      {!processingTimeRandom && (
        <input
          type="number"
          name="processingTime"
          placeholder="Processing Time"
          value={job.processingTime}
          onChange={handleChange}
          required
        />
      )}
      
      {!dueDateRandom && (
        <input
          type="number"
          name="dueDate"
          placeholder="Due Date"
          value={job.dueDate}
          onChange={handleChange}
        />
      )}
      
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
