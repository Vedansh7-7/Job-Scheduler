from helper import flow_time, lateness, slack, crtical_ratio
import pandas as pd


def fcfo(processing_time_list, due_dates_list, n):
    # print("Processing Time:", processing_time_list)
    # print("Due Dates:", due_dates_list)
    st = slack(processing_time_list, due_dates_list, n)
    cr = crtical_ratio(processing_time_list, due_dates_list, n)
    flow = flow_time(processing_time_list)
    ln = lateness(flow, due_dates_list, n)

    Avg_latness = sum(ln) / n
    Avg_Completion_time = sum(flow) / n
    Utilization = round(sum(processing_time_list) / sum(flow), 2)
    Avg_no_of_jobs_in_the_system = round(sum(flow) / sum(processing_time_list), 2)

    # print("Average Lateness:", Avg_latness)
    # print("Average Completion Time:", Avg_Completion_time)
    # print("Utilization:", Utilization)
    # print("Avg No. of Jobs in the System:", Avg_no_of_jobs_in_the_system)
    dict = {"Average Lateness:": Avg_latness, "Average Completion Time:": Avg_Completion_time, "Utilization:": Utilization, "Avg No. of Jobs in the System:": Avg_no_of_jobs_in_the_system}
    df = pd.DataFrame({'Processing Time': processing_time_list, 'Due Dates': due_dates_list, 'Slack': st, 'Flow Time': flow, 'Lateness': ln})
    return [df, dict]


def spt(processing_time, due_dates, n):
    combined_list = sorted(zip(processing_time, due_dates), key=lambda x: x[0])
    sorted_processing_time_list, sorted_due_dates_list = zip(*combined_list)

    st = slack(sorted_processing_time_list, sorted_due_dates_list, n)
    cr = crtical_ratio(sorted_processing_time_list, sorted_due_dates_list, n)
    flow = flow_time(sorted_processing_time_list)
    ln = lateness(flow, sorted_due_dates_list, n)

    Avg_latness = sum(ln) / n
    Avg_Completion_time = sum(flow) / n
    Utilization = round(sum(sorted_processing_time_list) / sum(flow), 2)
    Avg_no_of_jobs_in_the_system = round(sum(flow) / sum(sorted_processing_time_list), 2)

    # print("Average Lateness:", Avg_latness)
    # print("Average Completion Time:", Avg_Completion_time)
    # print("Utilization:", Utilization)
    # print("Avg No. of Jobs in the System:", Avg_no_of_jobs_in_the_system)
    dict = {"Average Lateness:": Avg_latness, "Average Completion Time:": Avg_Completion_time, "Utilization:": Utilization, "Avg No. of Jobs in the System:": Avg_no_of_jobs_in_the_system}
    df = pd.DataFrame({'Processing Time': sorted_processing_time_list, 'Due Dates': sorted_due_dates_list, 'Slack': st, 'Critical Ratio': cr, 'Flow Time': flow, 'Lateness': ln})
    return [df, dict]

def lpt(processing_time, due_dates, n):
    combined_list = sorted(zip(processing_time, due_dates), key=lambda x: x[0], reverse=True)
    sorted_processing_time_list, sorted_due_dates_list = zip(*combined_list)

    st = slack(sorted_processing_time_list, sorted_due_dates_list, n)
    cr = crtical_ratio(sorted_processing_time_list, sorted_due_dates_list, n)
    flow = flow_time(sorted_processing_time_list)
    ln = lateness(flow, sorted_due_dates_list, n)

    Avg_latness = sum(ln) / n
    Avg_Completion_time = sum(flow) / n
    Utilization = round(sum(sorted_processing_time_list) / sum(flow), 2)
    Avg_no_of_jobs_in_the_system = round(sum(flow) / sum(sorted_processing_time_list), 2)

    # print("Average Lateness:", Avg_latness)
    # print("Average Completion Time:", Avg_Completion_time)
    # print("Utilization:", Utilization)
    # print("Avg No. of Jobs in the System:", Avg_no_of_jobs_in_the_system)
    dict = {"Average Lateness:": Avg_latness, "Average Completion Time:": Avg_Completion_time, "Utilization:": Utilization, "Avg No. of Jobs in the System:": Avg_no_of_jobs_in_the_system}

    df = pd.DataFrame({'Processing Time': sorted_processing_time_list, 'Due Dates': sorted_due_dates_list, 'Slack': st, 'Critical Ratio': cr, 'Flow Time': flow, 'Lateness': ln})
    return [df, dict]


def smallest_slack(processing_time, due_dates, n):
    st = slack(processing_time, due_dates, n)
    combined_list = sorted(zip(processing_time, due_dates, st), key=lambda x: x[2])
    sorted_processing_time_list, sorted_due_dates_list, sorted_slack = zip(*combined_list)

    cr = crtical_ratio(sorted_processing_time_list, sorted_due_dates_list, n)
    flow = flow_time(sorted_processing_time_list)
    ln = lateness(flow, sorted_due_dates_list, n)

    Avg_latness = sum(ln) / n
    Avg_Completion_time = sum(flow) / n
    Utilization = round(sum(sorted_processing_time_list) / sum(flow), 2)
    Avg_no_of_jobs_in_the_system = round(sum(flow) / sum(sorted_processing_time_list), 2)

    # print("Average Lateness:", Avg_latness)
    # print("Average Completion Time:", Avg_Completion_time)
    # print("Utilization:", Utilization)
    # print("Avg No. of Jobs in the System:", Avg_no_of_jobs_in_the_system)

    dict = {"Average Lateness:": Avg_latness, "Average Completion Time:": Avg_Completion_time, "Utilization:": Utilization, "Avg No. of Jobs in the System:": Avg_no_of_jobs_in_the_system}
    df = pd.DataFrame({'Processing Time': sorted_processing_time_list, 'Due Dates': sorted_due_dates_list, 'Slack': sorted_slack, 'Critical Ratio': cr, 'Flow Time': flow, 'Lateness': ln})
    return [df, dict]

def smallest_critical_ratio(processing_time, due_dates, n):
    cr = crtical_ratio(processing_time, due_dates, n)
    combined_list = sorted(zip(processing_time, due_dates, cr), key=lambda x: x[2])
    sorted_processing_time_list, sorted_due_dates_list, sorted_critical_ratio = zip(*combined_list)

    st = slack(sorted_processing_time_list, sorted_due_dates_list, n)
    flow = flow_time(sorted_processing_time_list)
    ln = lateness(flow, sorted_due_dates_list, n)

    Avg_latness = sum(ln) / n
    Avg_Completion_time = sum(flow) / n
    Utilization = round(sum(sorted_processing_time_list) / sum(flow), 2)
    Avg_no_of_jobs_in_the_system = round(sum(flow) / sum(sorted_processing_time_list), 2)

    # print("Average Lateness:", Avg_latness)
    # print("Average Completion Time:", Avg_Completion_time)
    # print("Utilization:", Utilization)
    # print("Avg No. of Jobs in the System:", Avg_no_of_jobs_in_the_system)

    dict = {"Average Lateness:": Avg_latness, "Average Completion Time:": Avg_Completion_time, "Utilization:": Utilization, "Avg No. of Jobs in the System:": Avg_no_of_jobs_in_the_system}

    df = pd.DataFrame({'Processing Time': sorted_processing_time_list, 'Due Dates': sorted_due_dates_list, 'Slack': st, 'Critical Ratio': sorted_critical_ratio, 'Flow Time': flow, 'Lateness': ln})
    return [df, dict]