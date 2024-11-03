import React, { useState, useEffect } from 'react';

function JobForm({ onAddJob, jobIndex, jobCount, processingTimeRandom, processingRange, dueDateRandom, dueDateMultiplier }) {
  const [job, setJob] = useState({ name: '', processingTime: '', duedate: '' });
  const [totalProcessingTime, setTotalProcessingTime] = useState(0);

  useEffect(() => {
    if (processingTimeRandom) {
      // Generate random processing time within the specified range
      const randomProcessingTime = Math.floor(Math.random() * (processingRange.max - processingRange.min + 1)) + processingRange.min;
      setJob((prev) => ({ ...prev, processingTime: randomProcessingTime }));
      setTotalProcessingTime((prev) => prev + randomProcessingTime);
    } else {
      // Reset processing time when not random
      setJob((prev) => ({ ...prev, processingTime: '' }));
    }
  }, [processingTimeRandom, processingRange]);

  useEffect(() => {
    if (dueDateRandom && totalProcessingTime > 0) {
      // Generate random due date based on total processing time and multiplier range
      const randomDueDate = Math.floor(
        Math.random() * (totalProcessingTime * dueDateMultiplier.b - totalProcessingTime * dueDateMultiplier.a + 1)
      ) + totalProcessingTime * dueDateMultiplier.a;
      setJob((prev) => ({ ...prev, duedate: randomDueDate }));
    } else {
      // Reset due date when not random
      setJob((prev) => ({ ...prev, duedate: '' }));
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
      // Reset job state after adding
      setJob({ name: '', processingTime: '', duedate: '' });
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
          name="duedate"
          placeholder="Due Date"
          value={job.duedate}
          onChange={handleChange}
        />
      )}
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
