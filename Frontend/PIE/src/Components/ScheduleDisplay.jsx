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

import React from 'react';

function ScheduleDisplay({ responseData }) {
  // Check if responseData is valid and if it's an array with elements
  if (!responseData || !Array.isArray(responseData.df) || responseData.df.length === 0) {
    return <p>No job data available.</p>;
  }

  return (
    <div>
      <h2>Scheduled Jobs</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Job Name</th> */}
            <th>Critical Ratio</th>
            <th>Due Dates</th>
            <th>Flow Time</th>
            <th>Lateness</th>
            <th>Processing Time</th>
            <th>Slack</th>
          </tr>
        </thead>
        <tbody>
          {responseData.df.map((job, index) => (
            <tr key={index}>
              {/* <td>{`Job ${index + 1}`}</td> */}
              <td>{job['Critical Ratio']}</td>
              <td>{job['Due Dates']}</td>
              <td>{job['Flow Time']}</td>
              <td>{job['Lateness']}</td>
              <td>{job['Processing Time']}</td>
              <td>{job['Slack']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleDisplay;
