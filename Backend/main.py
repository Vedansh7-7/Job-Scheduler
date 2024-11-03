from flask import Flask, request, jsonify
from flask_cors import CORS
from scheduler import generate_job_data, schedule_jobs

app = Flask(__name__)
CORS(app)

@app.route('/submit-data', methods=['POST'])

def submit_data():
    data = request.get_json()
    print(data)   
    
    n = data.get('jobCount', 5)
# {'processingRange': {'min': 3, 'max': 12}, 'dueDateMultiplier': {'a': 0.4, 'b': 0.8}, 'jobName': '', 'jobCount': 4}
    # ran = data.get('ran', "random")
    ran = "random"
    x = data.get('processingRange', 2)['min']
    y = data.get('processingRange', 100)['max']
    a = data.get('dueDateMultiplier', 0.5)['a']
    b = data.get('dueDateMultiplier', 1.1)['b']
    # {'jobs': [{'name': 'S', 'processingTime': 10, 'duedate': 5}, {'name': 'F', 'processingTime': 2, 'duedate': 4},
    #            {'name': 'R', 'processingTime': 18, 'duedate': 22}], 'jobName': '', 'jobCount': 3}
    # print(n,x,y,a,b)
    
    # else:
    #     pt_list = []
    #     dd_list = []
    #     for i in range(n):
    #         x = data.get('x', 2)
    #         pt_list.append(x)

        
    # scheduling_method = data.get('scheduling_method', 1)
    scheduling_method = 4
    if(type(x) == "List"):
        pt_list = x
        dd_list = y
    else:
        pt_list, dd_list = generate_job_data(x, y, a, b, n, ran)
    li = schedule_jobs(pt_list, dd_list, n, scheduling_method)
    # try:
    #     li = schedule_jobs(pt_list, dd_list, n, scheduling_method)
    # except ValueError as e:
    #     return jsonify({"error": str(e)}), 400
    print(li[0])
    print(li[1])
    df = li[0].to_dict(orient='records')  
    di = li[1] 
    print(df)
    print(di)
    return data
    # return jsonify({"df": df, "di": di})

if __name__ == '__main__':
    app.run(debug=True)
