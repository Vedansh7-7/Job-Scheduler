import React from 'react';

function RuleSelector({ selectedRule, onRuleChange }) {
  const rules = ["FCFS", "SPT", "LPT", "Smallest Slack", "Smallest Criticality Ratio"];

  return (
    <div>
      <h3>Select Scheduling Rule:</h3>
      <select value={selectedRule} onChange={(e) => onRuleChange(e.target.value)}>
        {rules.map((rule) => (
          <option key={rule} value={rule}>{rule}</option>
        ))}
      </select>
    </div>
  );
}

export default RuleSelector;
