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
            <th>Job Name</th>
            <th>Processing Time</th>
            <th>Due Dates</th>
            <th>Critical Ratio</th>
            <th>Slack</th>
            <th>Flow Time</th>
            <th>Lateness</th>
          </tr>
        </thead>
        <tbody>
          {responseData.df.map((job, index) => (
            <tr key={index}>
              <td>{job['Job Names']}</td>
              <td>{job['Processing Time']}</td>
              <td>{job['Due Dates']}</td>
              <td>{job['Critical Ratio']}</td>
              <td>{job['Slack']}</td>
              <td>{job['Flow Time']}</td>
              <td>{job['Lateness']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Average Completion Time</th>
            <th>Average Lateness</th>
            <th>Average No. of Jobs in System</th>
            <th>Utilization</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{responseData.di['Average Completion Time:']}</td>
            <td>{responseData.di['Average Lateness:']}</td>
            <td>{responseData.di['Avg No. of Jobs in the System:']}</td>
            <td>{responseData.di['Utilization:']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleDisplay