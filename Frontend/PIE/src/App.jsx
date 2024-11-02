// App.js
import React, { useState } from 'react';
import JobForm from './Components/JobForm';
import RuleSelector from './Components/RuleSelector';
import ScheduleDisplay from './Components/ScheduleDisplay';
import { scheduleJobs } from './Components/schedulingRules';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedRule, setSelectedRule] = useState("FCFS");
  const [scheduledJobs, setScheduledJobs] = useState([]);

  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  const handleRuleChange = (rule) => {
    setSelectedRule(rule);
  };

  const handleScheduleJobs = () => {
    const result = scheduleJobs(jobs, selectedRule);
    setScheduledJobs(result);
  };

  return (
    <div className="App">
      <h1>Job Scheduling Simulator</h1>
      <JobForm onAddJob={handleAddJob} />
      <RuleSelector selectedRule={selectedRule} onRuleChange={handleRuleChange} />
      <button onClick={handleScheduleJobs}>Schedule Jobs</button>
      <ScheduleDisplay scheduledJobs={scheduledJobs} />
    </div>
  );
}

export default App;
