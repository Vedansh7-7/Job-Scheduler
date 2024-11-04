import React, { useState, useEffect } from 'react';

function JobForm({ onAddJob, jobIndex, jobCount, processingTimeRandom, processingRange, dueDateRandom, dueDateMultiplier }) {
  const [job, setJob] = useState({ name: '', processingTime: '', duedate: '' });
  const [totalProcessingTime, setTotalProcessingTime] = useState(0);

  useEffect(() => {
    if (processingTimeRandom && processingRange.min != null && processingRange.max != null) {
      const min = Math.min(processingRange.min, processingRange.max);
      const max = Math.max(processingRange.min, processingRange.max);
      const randomProcessingTime = Math.floor(Math.random() * (max - min + 1)) + min;
      
      setJob((prev) => ({ ...prev, processingTime: randomProcessingTime }));
      setTotalProcessingTime((prev) => prev + randomProcessingTime);
    }
  }, [processingTimeRandom, processingRange]); 

  useEffect(() => {
    if (dueDateRandom && totalProcessingTime > 0) {
      const { a, b } = dueDateMultiplier;
      const minDueDate = totalProcessingTime * a;
      const maxDueDate = totalProcessingTime * b;
      const randomDueDate = Math.floor(Math.random() * (maxDueDate - minDueDate + 1)) + minDueDate;

      setJob((prev) => ({ ...prev, duedate: randomDueDate }));
    }
  }, [dueDateRandom, totalProcessingTime, dueDateMultiplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.name && (job.processingTime || processingTimeRandom)) {
      onAddJob({
        ...job,
        processingTime: parseInt(job.processingTime, 10),
        duedate: parseInt(job.duedate, 10),
      });
      setJob({ name: '', processingTime: '', duedate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
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
          name="duedate"
          placeholder="Due Date"
          value={job.duedate}
          onChange={handleChange}
        />
      )}
      <button className="btn" type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
