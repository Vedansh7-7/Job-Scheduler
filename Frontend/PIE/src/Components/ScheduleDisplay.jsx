// import React from 'react';

// function ScheduleDisplay({ scheduledJobs }) {
//   return (
//     <div>
//       <h3>Scheduled Jobs:</h3>
//       {scheduledJobs.length ? (
//         <ul>
//           {scheduledJobs.map((job, index) => (
//             <li key={index}>{job.name} (Processing Time: {job.processingTime})</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No scheduled jobs to display.</p>
//       )}
//     </div>
//   );
// }

// export default ScheduleDisplay;

function ScheduleDisplay({ responseData }) {
  if (!responseData || responseData.length === 0) {
    return <p>No job data available.</p>;
  }

  return (
    <div>
      <h2>Scheduled Jobs</h2>
      <table>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Processing Time</th>
            <th>Due Date</th>
            <th>Completion Time</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((job, index) => (
            <tr key={index}>
              <td>{job.name}</td>
              <td>{job.processingTime}</td>
              <td>{job.duedate}</td>
              <td>{job.completionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ScheduleDisplay;
