import React from 'react';

function ScheduleDisplay({ scheduledJobs }) {
  return (
    <div>
      <h3>Scheduled Jobs:</h3>
      {scheduledJobs.length ? (
        <ul>
          {scheduledJobs.map((job, index) => (
            <li key={index}>{job.name} (Processing Time: {job.processingTime})</li>
          ))}
        </ul>
      ) : (
        <p>No scheduled jobs to display.</p>
      )}
    </div>
  );
}

export default ScheduleDisplay;
