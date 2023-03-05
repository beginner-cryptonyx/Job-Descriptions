from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = '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'


@app.route("/", methods=['GET', 'POST'])
def main():
    global btnstate, output_content
    btnstate = 'no'
    if request.method == "POST" and 'sub' in request.form:
        print(f'city: {request.form["city"]} | grade: {request.form["holder"]} | year:{request.form["year"]} | btn_state:{request.form["holder2"]}')
        
        btnstate = request.form["holder2"]
        gpt3 = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Give or Predict me a List of Schools in {request.form['city']} for acadamic year {request.form['year']} for grade {request.form['holder']}"}]
        )
        
        output_content = gpt3['choices'][0]['message']['content']

        # I need list of schools in {city} for acadamic year {year} for class {grade}
        
    return render_template('main.html')

@app.route('/remove_form')
def remove_form():
    if btnstate == 'yes': 
        message = {'action': 'remove'}
        
    else:
        {'action': 'null'}
        
    return jsonify(message)

@app.route('/output')
def output():
    message = {'content' : output_content}
    return jsonify(message)