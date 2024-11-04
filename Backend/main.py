from flask import Flask, request, jsonify
from flask_cors import CORS
from scheduler import generate_job_data, schedule_jobs

app = Flask(__name__)
CORS(app)

@app.route('/submit-data', methods=['POST'])
# {'randomizeAll': False, 'jobCount': 3, 'selectedRule': 'FCFS', 'processingRange': {'min': 2, 'max': 4}, 'dueDateMultiplier': {'a': 0.2, 'b': 0.6}}

def submit_data():
    data = request.get_json()  
    print(data)
    n = data.get('jobCount', 5)
    ran = data.get('randomizeAll', False)
    scheduling_method = data.get('selectedRule', 'FCFS')
    job_name = []
    pt_list = []
    dd_list = []
    for i in range(n):
        name = data.get('jobs')[i]['name']
        job_name.append(name)
    print(job_name)
# {'processingRange': {'min': 3, 'max': 12}, 'dueDateMultiplier': {'a': 0.4, 'b': 0.8}, 'jobName': '', 'jobCount': 4}
    ran = data.get('randomizeAll', "random")
    print(ran)
    if ran:
        print("random")
        x = data.get('processingRange', 2)['min']
        y = data.get('processingRange', 100)['max']
        a = data.get('dueDateMultiplier', 0.5)['a']
        b = data.get('dueDateMultiplier', 1.1)['b']

        pt_list, dd_list = generate_job_data(x, y, a, b, n)
    else:
        jobs = data.get('jobs')
        for i in range(n):
            dictionary = jobs[i]
            name = dictionary['name']
            pt = dictionary['processingTime']
            dd = dictionary['duedate']
            pt_list.append(pt)
            dd_list.append(dd)
#   {'randomizeAll': False, 'jobCount': 3, 'jobs': [{'name': 'S', 'processingTime': 2, 'duedate': 4},
#                          {'name': 'F', 'processingTime': 4, 'duedate': 6}, {'name': 'H', 'processingTime': 6, 'duedate': 8}]}
    
    try:
        li = schedule_jobs(pt_list, dd_list, n, scheduling_method, job_name)
    except ValueError as e:
        print(e)
        return jsonify({"error": str(e)}), 400
    df = li[0].to_dict(orient='records')  
    di = li[1] 
    print(df)
    return jsonify({"df": df, "di": di})

if __name__ == '__main__':
    app.run(debug=True)
