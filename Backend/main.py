from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from scheduler import generate_job_data, schedule_jobs
import os

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.urandom(24)
Session(app)
CORS(app)

job_data_store = {}

@app.before_request
def assign_session_id():
    if 'session_id' not in session:
        session['session_id'] = os.urandom(24).hex()

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.get_json()
    session_id = session.get('session_id')
    
    if session_id not in job_data_store:
        job_data_store[session_id] = {"pt_list": [], "dd_list": []}
    
    global n 
    n = data.get('jobCount', 5)
    ran = data.get('randomizeAll', False)
    scheduling_method = data.get('selectedRule', 'FCFS')
    global name_list
    name_list = []
    global pt_list
    pt_list = job_data_store[session_id]["pt_list"]
    global dd_list
    dd_list = job_data_store[session_id]["dd_list"]

    if ran:
        if not pt_list or not dd_list:  
            x = data.get('processingRange', 2)['min']
            y = data.get('processingRange', 100)['max']
            a = data.get('dueDateMultiplier', 0.5)['a']
            b = data.get('dueDateMultiplier', 1.1)['b']
            jobs = data.get('jobs')
            for j in jobs:
                name_list.append(j['name'])

            pt_list, dd_list = generate_job_data(x, y, a, b, n)
            job_data_store[session_id]["pt_list"] = pt_list
            job_data_store[session_id]["dd_list"] = dd_list
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
        
        job_data_store[session_id]["pt_list"] = pt_list
        job_data_store[session_id]["dd_list"] = dd_list

    try:
        li = schedule_jobs(pt_list, dd_list, n, scheduling_method, name_list)
    except ValueError as e:
        print(e)
        return jsonify({"error": str(e)}), 400
    
    df = li[0].to_dict(orient='records')  
    di = li[1] 
    
    return jsonify({"df": df, "di": di})

@app.route('/submit-data-rule-change', methods=["POST",])
def submit_data_rule_change():
    data = request.get_json()
    scheduling_method = data.get('selectedRule', 'FCFS')

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
