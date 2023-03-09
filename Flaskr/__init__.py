from flask import Flask, render_template, request, jsonify, session
import openai
from . import config

app = Flask(__name__)
app.secret_key = "l"
openai.api_key = config.key

@app.route("/", methods=['GET', 'POST'])
def main():
    if request.method == "POST" and 'sub' in request.form:

        gpt3 = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Give me a job description of a person with {request.form['year']} experiance in {request.form['skill']}"}]
        )
        
        session['output_content'] = gpt3['choices'][0]['message']['content']
        # session['output_content'] = 'lorem ipsum'
        
    return render_template('main.html')

@app.route('/output')
def output():
    message = {'content' : session.get('output_content')}
    return jsonify(message)

@app.route('/resetable_update_true')
def resetable_update_true():
    session['resetable'] = True
    return ""
   
@app.route('/resetable_update_false')
def resetable_update_false():
    session['resetable'] = False
    return ""

@app.route("/get_resetable")
def get_resetable():
    return f"{session.get('resetable')}"