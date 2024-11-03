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
  const [dueDateMultiplier, setDueDateMultiplier] = useState({ a: 1, b: 2 });

  const handleJobCountChange = (e) => setJobCount(Math.max(1, Number(e.target.value)));

  const handleAddJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handleRuleChange = (rule) => setSelectedRule(rule);

  const handleScheduleJobs = () => setScheduledJobs(scheduleJobs(jobs, selectedRule));

  return (
    <div className="App">
      <h1>Job Scheduling Simulator</h1>
      
      <div className="ptrandom random">
        <h3>Processing Time Options</h3>
        <h5>[x,y]</h5>
        <label>
          <input
            type="checkbox"
            checked={processingTimeRandom}
            onChange={() => setProcessingTimeRandom(!processingTimeRandom)}
          />
          <br/>Random Processing Time
        </label>
        {processingTimeRandom && (
          <div>
            <span style={{fontWeight: 600}}>x: </span>
            <input
              type="number"
              placeholder="Min"
              value={processingRange.min}
              onChange={(e) => setProcessingRange({ ...processingRange, min: Number(e.target.value) })}
            />
            <br/>
            <span style={{fontWeight: 600}}>y: </span>
            <input
              type="number"
              placeholder="Max"
              value={processingRange.max}
              onChange={(e) => setProcessingRange({ ...processingRange, max: Number(e.target.value) })}
            />
          </div>
        )}
      </div>

      <div className="ddrandom random">
        <h3>Due Date Options</h3>
        <h5>[(Total Processing Time)*(a),(Total Processing Time)*(b)]</h5>
        <label>
          <input
            type="checkbox"
            checked={dueDateRandom}
            onChange={() => setDueDateRandom(!dueDateRandom)}
          />
          <br/>Random Due Date
        </label>
        {dueDateRandom && (
          <div>
            <span style={{fontWeight: 600}}>a: </span>
            <input
              type="number"
              placeholder="Multiplier a"
              value={dueDateMultiplier.a}
              onChange={(e) => setDueDateMultiplier({ ...dueDateMultiplier, a: Number(e.target.value) })}
            />
            <br/>
            <span style={{fontWeight: 600}}>b: </span>
            <input
              type="number"
              placeholder="Multiplier b"
              value={dueDateMultiplier.b}
              onChange={(e) => setDueDateMultiplier({ ...dueDateMultiplier, b: Number(e.target.value) })}
            />
          </div>
        )}
      </div>

      <label>
        <h2>Number of Jobs:</h2> 
        <input
          type="number"
          min="1"
          value={jobCount}
          onChange={handleJobCountChange}
        />
      </label>
      
      {jobs.length < jobCount ? (
        <JobForm
          jobIndex={jobs.length}
          jobCount={jobCount}
          onAddJob={handleAddJob}
          processingTimeRandom={processingTimeRandom}
          dueDateRandom={dueDateRandom}
        />
      ) : (
        <div>
          <p>All jobs added!</p>
          <RuleSelector 
            selectedRule={selectedRule} 
            onRuleChange={handleRuleChange} 
          />
          <button onClick={handleScheduleJobs}>Schedule Jobs</button>
        </div>
      )}
      
      <ScheduleDisplay scheduledJobs={scheduledJobs} />
    </div>
  );
}

export default App;
