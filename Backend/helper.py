def crtical_ratio(processing_time, due_dates, n):
    critical_ratio = [round(due_dates[i] / processing_time[i], 2) for i in range(n)]
    print("Critical Ratio:", critical_ratio)
    return critical_ratio

def flow_time(processing_time):
    flow_time = [processing_time[0]]
    for i in range(1, len(processing_time)):
        flow_time.append(flow_time[-1] + processing_time[i])
    return flow_time

def slack(processing_time, due_dates, n):
    slack = [due_dates[i] - processing_time[i] for i in range(n)]
    print("Slack:", slack)
    return slack

def lateness(flow_time, due_dates, n):
    lateness = [max(0, flow_time[i] - due_dates[i]) for i in range(n)]
    print("Lateness:", lateness)
    return lateness