# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from scheduler import generate_job_data, schedule_jobs

# app = Flask(__name__)
# CORS(app)

# @app.route('/submit-data', methods=['POST'])
# # {'randomizeAll': False, 'jobCount': 3, 'selectedRule': 'FCFS', 'processingRange': {'min': 2, 'max': 4}, 'dueDateMultiplier': {'a': 0.2, 'b': 0.6}}

# def submit_data():
#     data = request.get_json()  
#     print(data)
#     n = data.get('jobCount', 5)
#     ran = data.get('randomizeAll', False)
#     scheduling_method = data.get('selectedRule', 'FCFS')
#     name_list = []
#     pt_list = []
#     dd_list = []
# # {'processingRange': {'min': 3, 'max': 12}, 'dueDateMultiplier': {'a': 0.4, 'b': 0.8}, 'jobName': '', 'jobCount': 4}
#     # ran = data.get('ran', "random")
#     # if ran:
#     #     x = data.get('processingRange', 2)['min']
#     #     y = data.get('processingRange', 100)['max']
#     #     a = data.get('dueDateMultiplier', 0.5)['a']
#     #     b = data.get('dueDateMultiplier', 1.1)['b']

#     #     pt_list, dd_list = generate_job_data(x, y, a, b, n)
#     # else:
#     #     jobs = data.get('jobs')
#     #     for i in range(n):
#     #         dictionary = jobs[i]
#     #         name = dictionary['name']
#     #         pt = dictionary['processingTime']
#     #         dd = dictionary['duedate']
#     #         pt_list.append(pt)
#     #         dd_list.append(dd)
#     #         name_list.append(name)
# #   {'randomizeAll': False, 'jobCount': 3, 'jobs': [{'name': 'S', 'processingTime': 2, 'duedate': 4},
# #                          {'name': 'F', 'processingTime': 4, 'duedate': 6}, {'name': 'H', 'processingTime': 6, 'duedate': 8}]}
#     x = data.get('processingRange', 2)['min']
#     y = data.get('processingRange', 100)['max']
#     a = data.get('dueDateMultiplier', 0.5)['a']
#     b = data.get('dueDateMultiplier', 1.1)['b']

#     pt_list, dd_list = generate_job_data(x, y, a, b, n)
    
#     try:
#         li = schedule_jobs(pt_list, dd_list, n, scheduling_method)
#     except ValueError as e:
#         print(e)
#         return jsonify({"error": str(e)}), 400
#     # print(li[0])
#     # print(li[1])
#     df = li[0].to_dict(orient='records')  
#     di = li[1] 
#     # print(df)
#     # print(di)
#     return jsonify({"df": df, "di": di})

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from scheduler import generate_job_data, schedule_jobs

app = Flask(__name__)
CORS(app)

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.get_json()
    print(data)

    try:
        # Extract parameters with defaults if not provided
        n = data.get('jobCount', 5)
        scheduling_method = data.get('selectedRule', 'FCFS')
        x = data.get('processingRange', {}).get('min', 2)
        y = data.get('processingRange', {}).get('max', 10)
        a = data.get('dueDateMultiplier', {}).get('a', 0.1)
        b = data.get('dueDateMultiplier', {}).get('b', 0.8)
        job_name = []
        for i in range(n):
            name = data.get('jobs')[i]['name']
            job_name.append(name)
        print(job_name)
        # Generate job data
        pt_list, dd_list = generate_job_data(x, y, a, b, n)
        # 'jobs': [{'name': 'S'}, {'name': 'D'}, {'name': 'F'}]}
        # Schedule jobs
        li = schedule_jobs(pt_list, dd_list, n, scheduling_method, job_name)
        df = li[0].to_dict(orient='records')
        di = li[1]
        print(jsonify({"df": df, "di": di}))
        return jsonify({"df": df, "di": di}), 200
    except ValueError as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print("Unhandled error:", e)
        return jsonify({"error": "An unexpected error occurred."}), 500

if __name__ == '__main__':
    app.run(debug=True)
