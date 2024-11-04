export function scheduleJobs(jobs, rule) {
    let sortedJobs = [...jobs];
  
    switch (rule) {
      case "FCFS":
        break; // Already in order of input
      case "SPT":
        sortedJobs.sort((a, b) => a.processingTime - b.processingTime);
        break;
      case "LPT":
        sortedJobs.sort((a, b) => b.processingTime - a.processingTime);
        break;
      case "Smallest Slack":
        sortedJobs.sort((a, b) => a.slack - b.slack);
        break;
      case "Smallest Criticality Ratio":
        sortedJobs.sort((a, b) => (a.deadline / a.processingTime) - (b.deadline / b.processingTime));
        break;
      default:
        break;
    }
  
    return sortedJobs;
  }
  