// import React, { useState } from 'react';
// import JobForm from './Components/JobForm';
// import RuleSelector from './Components/RuleSelector';
// import ScheduleDisplay from './Components/ScheduleDisplay';
// import { scheduleJobs } from './Components/schedulingRules';
// import './App.css';

// function App() {
//   const [jobCount, setJobCount] = useState(1);
//   const [jobs, setJobs] = useState([]);
//   const [selectedRule, setSelectedRule] = useState("FCFS");
//   const [scheduledJobs, setScheduledJobs] = useState([]);
//   const [processingTimeRandom, setProcessingTimeRandom] = useState(false);
//   const [dueDateRandom, setDueDateRandom] = useState(false);
//   const [processingRange, setProcessingRange] = useState({ min: 1, max: 10 });
//   const [dueDateMultiplier, setDueDateMultiplier] = useState({ a: 0.1, b: 0.8 });
//   const [randomizeAll, setRandomizeAll] = useState(false);

//   const handleJobCountChange = (e) => setJobCount(Math.max(1, Number(e.target.value)));

//   const handleAddJob = (newJob) => {
//     setJobs((prevJobs) => [...prevJobs, newJob]);
//   };

//   const handleRuleChange = (rule) => setSelectedRule(rule);

//   const handleScheduleJobs = () => {
//     setScheduledJobs(scheduleJobs(jobs, selectedRule));
//   };

//   const handleRandomizeAll = () => {
//     const newRandomizeAll = !randomizeAll;
//     setRandomizeAll(newRandomizeAll);
//     setProcessingTimeRandom(newRandomizeAll);
//     setDueDateRandom(newRandomizeAll);
//   };

//   const [responseData, setResponseData] = useState(null);

// const handleSubmit = async () => {
//   let dataToSend = {
//     randomizeAll,
//     jobCount,
//     selectedRule,
//   };

//   if (processingTimeRandom && dueDateRandom) {
//     dataToSend = {
//       ...dataToSend,
//       processingRange,
//       dueDateMultiplier,
//       jobs,
//     };
//   } else if (processingTimeRandom && !dueDateRandom) {
//     const dueDates = jobs.map(job => job.dueDate); 
//     dataToSend = {
//       ...dataToSend,
//       processingRange,
//       dueDates,
//       jobs,
//     };
//   } else if (!processingTimeRandom && dueDateRandom) {
//     const processingTimes = jobs.map(job => job.processingTime); 
//     dataToSend = {
//       ...dataToSend,
//       processingTimes,
//       dueDateMultiplier,
//     };
//   } else {
//     dataToSend = {
//       ...dataToSend,
//       jobs,
//     };
//   }

//   try {
//     const response = await fetch('http://localhost:5173/submit-data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataToSend),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send data');
//     }

//     const responseData = await response.json();
//     setResponseData(responseData);
//     console.log('Response:', responseData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };



// return (
//   <div className="App">
//     <h1>Job Scheduling Simulator</h1>
    
//     {/* Randomize All Option */}
//     <div className="randomize-all">
//       <label>
//         <input
//           type="checkbox"
//           checked={randomizeAll}
//           onChange={handleRandomizeAll}
//         />
//         <strong> Random PT and DD</strong>
//       </label>
//     </div>

//     {/* Job Count Input */}
//     <label>
//       <h2>Number of Jobs:</h2>
//       <input
//         type="number"
//         min="1"
//         value={jobCount}
//         onChange={handleJobCountChange}
//       />
//     </label>

//     {randomizeAll ? (
//       <>
//         {/* Processing Time Options */}
//         <div className="ptrandom random">
//           <h3>Processing Time Options</h3>
//           <h5>[x, y]</h5>
//           <label>
//             <input
//               type="checkbox"
//               checked={processingTimeRandom}
//               onChange={() => setProcessingTimeRandom(processingTimeRandom)}
//             />
//             <br /><span style={{color: "#333"}}>Random Processing Time</span>
//           </label>
//           {processingTimeRandom && (
//             <div>
//               <div>
//                 <label>
//                   <strong style={{color: "#333"}}>x:</strong>
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={processingRange.min}
//                     onChange={(e) => setProcessingRange({
//                       ...processingRange,
//                       min: Number(e.target.value),
//                     })}
//                   />
//                 </label>
//               </div>
//               <br />
//               <div>
//                 <label>
//                   <strong style={{color: "#333"}}>y:</strong>
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={processingRange.max}
//                     onChange={(e) => setProcessingRange({
//                       ...processingRange,
//                       max: Math.max(Number(e.target.value), processingRange.min),
//                     })}
//                   />
//                 </label>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Due Date Options */}
//         <div className="ddrandom random">
//           <h3>Due Date Options</h3>
//           <h5>[(Total Processing Time) * (a), (Total Processing Time) * (b)]</h5>
//           <label>
//             <input
//               type="checkbox"
//               checked={dueDateRandom}
//               onChange={() => setDueDateRandom(dueDateRandom)}
//             />
//             <br /><span style={{color: "#333"}}>Random Due Date</span>
//           </label>
//           {dueDateRandom && (
//             <div>
//               <div>
//                 <label>
//                   <strong style={{color: "#333"}}>a:</strong>
//                   <input
//                     type="number"
//                     placeholder="Multiplier a"
//                     value={dueDateMultiplier.a}
//                     onChange={(e) => setDueDateMultiplier({
//                       ...dueDateMultiplier,
//                       a: Number(e.target.value),
//                     })}
//                   />
//                 </label>
//               </div>
//               <br />
//               <div>
//                 <label>
//                   <strong style={{color: "#333"}}>b:</strong>
//                   <input
//                     type="number"
//                     placeholder="Multiplier b"
//                     value={dueDateMultiplier.b}
//                     onChange={(e) => setDueDateMultiplier({
//                       ...dueDateMultiplier,
//                       b: Number(e.target.value),
//                     })}
//                   />
//                 </label>
//               </div>
//             </div>
//           )}
//         </div>
//       </>
//     ) : null}

//     {jobs.length < jobCount ? (
//       <JobForm
//         jobIndex={jobs.length}
//         jobCount={jobCount}
//         onAddJob={handleAddJob}
//         processingTimeRandom={processingTimeRandom}
//         dueDateRandom={dueDateRandom}
//         processingRange={processingRange}
//         dueDateMultiplier={dueDateMultiplier}
//       />
//     ) : (
//       <div>
//         <p>All jobs added!</p>
//         <RuleSelector selectedRule={selectedRule} onRuleChange={handleRuleChange} />
//         <button onClick={handleScheduleJobs}>Schedule Jobs</button>
//       </div>
//     )}

//     <ScheduleDisplay scheduledJobs={scheduledJobs} />

//     {/* Send data to backend*/}
//     <button onClick={handleSubmit}>Submit</button>
    
//     {responseData && (
//         <div>
//           <h3>Response from Server:</h3>
//           <p><strong>DF:</strong> {JSON.stringify(responseData.df)}</p>
//           <p><strong>DI:</strong> {JSON.stringify(responseData.di)}</p>
//         </div>
//       )}
    
//   </div>
// );

// }

// export default App;

import React, { useState } from 'react';
import JobForm from './Components/JobForm';
import RuleSelector from './Components/RuleSelector';
import ScheduleDisplay from './Components/ScheduleDisplay';
import './App.css';

function App() {
  const [jobCount, setJobCount] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [selectedRule, setSelectedRule] = useState("FCFS");
  const [scheduledJobs, setScheduledJobs] = useState([]);
  const [processingTimeRandom, setProcessingTimeRandom] = useState(false);
  const [dueDateRandom, setDueDateRandom] = useState(false);
  const [processingRange, setProcessingRange] = useState({ min: 1, max: 10 });
  const [dueDateMultiplier, setDueDateMultiplier] = useState({ a: 0.1, b: 0.8 });
  const [randomizeAll, setRandomizeAll] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2 , setShowModal2] = useState(false);
  const [showModal3 , setShowModal3] = useState(false);

  const handleJobCountChange = (e) => setJobCount(Math.max(1, Number(e.target.value)));

  const handleAddJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handleRandomizedInputClick = () => {
    setShowModal(true);
  };

  const handleSubmitClick = () => {
    setShowModal3(true);
  };

  const handleRandomizeAll = () => {
    setRandomizeAll(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleManualInputClick = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setProcessingRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleRuleChange = (rule) => setSelectedRule(rule);

  const handleMultiplierChange = (e) => {
    const { name, value } = e.target;
    setDueDateMultiplier((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async () => {
    let dataToSend = {
      randomizeAll,
      jobCount,
      selectedRule,
      processingRange,
      dueDateMultiplier,
      jobs,
    };

    try {
      const response = await fetch('http://localhost:5173/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      setResponseData(responseData);
      console.log('Response:', responseData);
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Process Flow</h1>
      </div>
      <div className="flow-chart">
        <div className="section raw-material">RAW MATERIAL</div>
        <div className="section process">PROCESS</div>
        <div className="section product-service">PRODUCT & SERVICE</div>
        <div className="section stock">STOCK</div>
      </div>
      <div className="container">
        <div className="form-section">
          <h2>Number of Jobs: {jobCount}</h2>
          <input
            type="number"
            min="1"
            value={jobCount}
            onChange={handleJobCountChange}
            className="job-input"
          />
          <div className="button-group">
            <button className="input-button" onClick={() => { handleRandomizedInputClick(); handleRandomizeAll(); }}>
              Randomised Input
            </button>
            <button className="input-button" onClick={handleManualInputClick}>Manual Input</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Randomized Input Parameters</h3>
            {jobs.length < jobCount ? (
              <JobForm
                onAddJob={handleAddJob}
                jobIndex={jobs.length}
                jobCount={jobCount}
                nameOnly={true}  // Only job name will be shown
              />
            ) : (
              <div>
                <p>All jobs added!</p>
              </div>
            )}
            <label>
              Due Date range (x, y):
              <input
                type="number"
                placeholder="x"
                name="min"
                value={processingRange.min}
                onChange={handleRangeChange}
                className="modal-input"
              />
              <input
                type="number"
                placeholder="y"
                name="max"
                value={processingRange.max}
                onChange={handleRangeChange}
                className="modal-input"
              />
            </label>
            <label>
              Processing Time Multiplier (a, b):
              <input
                type="number"
                placeholder="a"
                name="a"
                value={dueDateMultiplier.a}
                onChange={handleMultiplierChange}
                className="modal-input"
              />
              <input
                type="number"
                placeholder="b"
                name="b"
                value={dueDateMultiplier.b}
                onChange={handleMultiplierChange}
                className="modal-input"
              />
            </label>
            <button onClick={() => { handleSubmit(); handleSubmitClick(); }} className="input-button random-btn">
              Submit
            </button>
            <button onClick={handleCloseModal} className="input-button random-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {showModal2 && (
        <div className="modal">
          <div className="modal-content">
            <h3>Manual Input Parameters</h3>
            {jobs.length < jobCount ? (
              <JobForm
                jobIndex={jobs.length}
                jobCount={jobCount}
                onAddJob={handleAddJob}
                processingTimeRandom={processingTimeRandom}
                dueDateRandom={dueDateRandom}
                processingRange={processingRange}
                dueDateMultiplier={dueDateMultiplier}
              />
            ) : (
              <div>
                <p>All jobs added!</p>
              </div>
            )}
            <button onClick={() => { handleSubmit(); handleSubmitClick(); }} className="input-button random-btn">
              Submit
            </button>
            <button onClick={handleCloseModal2} className="input-button random-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {showModal3 && (
        <div className="modal3">
          <div className="modal-content">
            <RuleSelector selectedRule={selectedRule} onRuleChange={handleRuleChange} />
            <div className="result">
              <ScheduleDisplay responseData={responseData} />
            </div>
            <button onClick={() => setShowModal3(false)} className="btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



