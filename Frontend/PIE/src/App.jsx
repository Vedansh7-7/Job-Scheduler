import React, { useState } from 'react';
import JobForm from './Components/JobForm';
import RuleSelector from './Components/RuleSelector';
import ScheduleDisplay from './Components/ScheduleDisplay';
import { scheduleJobs } from './Components/schedulingRules';
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

  const handleJobCountChange = (e) => setJobCount(Math.max(1, Number(e.target.value)));

  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleRuleChange = (rule) => setSelectedRule(rule);

  const handleScheduleJobs = () => {
    setScheduledJobs(scheduleJobs(jobs, selectedRule));
  };

  const handleRandomizeAll = () => {
    const newRandomizeAll = !randomizeAll;
    setRandomizeAll(newRandomizeAll);
    setProcessingTimeRandom(newRandomizeAll);
    setDueDateRandom(newRandomizeAll);
  };

  const handleSubmit = async () => {
    let dataToSend = {
      randomizeAll,
      jobCount,
      selectedRule,
    };

    if (processingTimeRandom && dueDateRandom) {
      dataToSend = {
        ...dataToSend,
        processingRange,
        dueDateMultiplier,
        jobs,
      };
    } else if (processingTimeRandom && !dueDateRandom) {
      const dueDates = jobs.map(job => job.dueDate); 
      dataToSend = {
        ...dataToSend,
        processingRange,
        dueDates,
        jobs,
      };
    } else if (!processingTimeRandom && dueDateRandom) {
      const processingTimes = jobs.map(job => job.processingTime); 
      dataToSend = {
        ...dataToSend,
        processingTimes,
        dueDateMultiplier,
      };
    } else {
      dataToSend = {
        ...dataToSend,
        jobs,
      };
    }

    try {
      const response = await fetch('http://localhost:5000/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      console.log('Data sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
};


return (
  <div className="App">
    <h1>Job Scheduling Simulator</h1>
    
    {/* Randomize All Option */}
    <div className="randomize-all">
      <label>
        <input
          type="checkbox"
          checked={randomizeAll}
          onChange={handleRandomizeAll}
        />
        <strong> Random PT and DD</strong>
      </label>
    </div>

    {/* Job Count Input */}
    <label>
      <h2>Number of Jobs:</h2>
      <input
        type="number"
        min="1"
        value={jobCount}
        onChange={handleJobCountChange}
      />
    </label>

    {randomizeAll ? (
      <>
        {/* Processing Time Options */}
        <div className="ptrandom random">
          <h3>Processing Time Options</h3>
          <h5>[x, y]</h5>
          <label>
            <input
              type="checkbox"
              checked={processingTimeRandom}
              onChange={() => setProcessingTimeRandom(processingTimeRandom)}
            />
            <br /><span style={{color: "#333"}}>Random Processing Time</span>
          </label>
          {processingTimeRandom && (
            <div>
              <div>
                <label>
                  <strong style={{color: "#333"}}>x:</strong>
                  <input
                    type="number"
                    placeholder="Min"
                    value={processingRange.min}
                    onChange={(e) => setProcessingRange({
                      ...processingRange,
                      min: Number(e.target.value),
                    })}
                  />
                </label>
              </div>
              <br />
              <div>
                <label>
                  <strong style={{color: "#333"}}>y:</strong>
                  <input
                    type="number"
                    placeholder="Max"
                    value={processingRange.max}
                    onChange={(e) => setProcessingRange({
                      ...processingRange,
                      max: Math.max(Number(e.target.value), processingRange.min),
                    })}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Due Date Options */}
        <div className="ddrandom random">
          <h3>Due Date Options</h3>
          <h5>[(Total Processing Time) * (a), (Total Processing Time) * (b)]</h5>
          <label>
            <input
              type="checkbox"
              checked={dueDateRandom}
              onChange={() => setDueDateRandom(dueDateRandom)}
            />
            <br /><span style={{color: "#333"}}>Random Due Date</span>
          </label>
          {dueDateRandom && (
            <div>
              <div>
                <label>
                  <strong style={{color: "#333"}}>a:</strong>
                  <input
                    type="number"
                    placeholder="Multiplier a"
                    value={dueDateMultiplier.a}
                    onChange={(e) => setDueDateMultiplier({
                      ...dueDateMultiplier,
                      a: Number(e.target.value),
                    })}
                  />
                </label>
              </div>
              <br />
              <div>
                <label>
                  <strong style={{color: "#333"}}>b:</strong>
                  <input
                    type="number"
                    placeholder="Multiplier b"
                    value={dueDateMultiplier.b}
                    onChange={(e) => setDueDateMultiplier({
                      ...dueDateMultiplier,
                      b: Number(e.target.value),
                    })}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </>
    ) : null}

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
        <RuleSelector selectedRule={selectedRule} onRuleChange={handleRuleChange} />
        <button onClick={handleScheduleJobs}>Schedule Jobs</button>
      </div>
    )}

    <ScheduleDisplay scheduledJobs={scheduledJobs} />

    {/* Send data to backend*/}
    <button onClick={handleSubmit}>Submit</button>
  </div>
);

}

export default App;
