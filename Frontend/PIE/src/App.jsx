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
        <div className="modal" style={{ overflowY: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto", padding: "20px", boxSizing: "border-box" }}>
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
                step="0.1"
                value={dueDateMultiplier.a}
                onChange={handleMultiplierChange}
                className="modal-input"
              />
              <input
                type="number"
                placeholder="b"
                name="b"
                step="0.1"
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
        <div className="modal" style={{overflowY: "auto"}}>
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
            <button className='btn' onClick={handleSubmit}>Submit</button>
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



