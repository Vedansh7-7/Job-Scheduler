import random
import pandas as pd
from scheduling_functions import fcfo, spt, lpt, smallest_slack, smallest_critical_ratio

def generate_job_data(x, y, a, b, n):
    pt_list = []
    dd_list = []

    for i in range(n):
        pt = random.randint(x, y)
        pt_list.append(pt)

    sum_pt = sum(pt_list)
    for i in range(n):
        dd = random.randint(int(sum_pt * a), int(sum_pt * b))
        dd_list.append(dd)
        
    return pt_list, dd_list


def schedule_jobs(pt_list, dd_list, n, scheduling_method):
    if scheduling_method == 'FCFS':
        return fcfo(pt_list, dd_list, n)
    elif scheduling_method == 'SPT':
        return spt(pt_list, dd_list, n)
    elif scheduling_method == 'LPT':
        return lpt(pt_list, dd_list, n)
    elif scheduling_method == 'Smallest Slack':
        return smallest_slack(pt_list, dd_list, n)
    elif scheduling_method == 'Smallest Criticality Ratio':
        return smallest_critical_ratio(pt_list, dd_list, n)
    else:
        raise ValueError("Invalid scheduling method selected.")


