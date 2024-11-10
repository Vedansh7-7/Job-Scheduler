from flask import Flask, request, jsonify, session
from flask_cors import CORS
from scheduler import generate_job_data, schedule_jobs
import os

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)  # Needed to use session in Flask

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.get_json()
    print(data)
    n = data.get('jobCount', 5)
    ran = data.get('randomizeAll', False)
    scheduling_method = data.get('selectedRule', 'FCFS')
    name_list = []

    # Initialize lists if they are not already in the session
    if 'pt_list' not in session or 'dd_list' not in session:
        session['pt_list'] = []
        session['dd_list'] = []
    
    # Retrieve pt_list and dd_list from the session
    pt_list = session['pt_list']
    dd_list = session['dd_list']

    if ran:
        if not pt_list or not dd_list:  # Only generate if lists are empty
            x = data.get('processingRange', 2)['min']
            y = data.get('processingRange', 100)['max']
            a = data.get('dueDateMultiplier', 0.5)['a']
            b = data.get('dueDateMultiplier', 1.1)['b']
            jobs = data.get('jobs')
            for j in jobs:
                name_list.append(j['name'])

            # Generate job data and update session variables
            pt_list, dd_list = generate_job_data(x, y, a, b, n)
            session['pt_list'] = pt_list
            session['dd_list'] = dd_list

    else:
        jobs = data.get('jobs')
        for i in range(n):
            dictionary = jobs[i]
            name = dictionary['name']
            pt = dictionary['processingTime']
            dd = dictionary['duedate']
            pt_list.append(pt)
            dd_list.append(dd)
            name_list.append(name)
    
    try:
        li = schedule_jobs(pt_list, dd_list, n, scheduling_method, name_list)
    except ValueError as e:
        print(e)
        return jsonify({"error": str(e)}), 400
    
    df = li[0].to_dict(orient='records')  
    di = li[1] 
    
    return jsonify({"df": df, "di": di})

if __name__ == '__main__':
    app.run(debug=True)
