import random 
import pandas as pd
from scheduling_functions import fcfo, spt, lpt, smallest_slack, smallest_critical_ratio

x = 2
y = 100
a = 0.5
b = 1.1

n = 5

pt_list = []
dd_list = []
for i in range(n):
    pt = random.randint(x, y)
    pt_list.append(pt)

sum_pt = sum(pt_list)
for i in range(n):
    dd = random.randint(int(sum_pt*a) , int(sum_pt*b))
    dd_list.append(dd)

scheduling_method = int(input("Enter the name of the method: "))
li = []
if scheduling_method == 1:
    li = fcfo(pt_list, dd_list, n)
elif scheduling_method == 2:
    li = spt(pt_list, dd_list, n)
elif scheduling_method == 3:
    li = lpt(pt_list, dd_list, n)
elif scheduling_method == 4:
    li = smallest_slack(pt_list, dd_list, n)
elif scheduling_method == 5:
    li = smallest_critical_ratio(pt_list, dd_list, n)
else:
    print("method sahi se batao")

df = li[0]
di = li[1]

print(df)
print(di)