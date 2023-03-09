# Imports
from flask import Flask, render_template, request, jsonify, session
import openai
from . import config # Custom file with confidential information

# Initializing flask app
app = Flask(__name__)
app.secret_key = config.secret_key
openai.api_key = config.api_key

# Main index page
@app.route("/", methods=['GET', 'POST'])
def main():
    
    # Check if form is submitted
    if request.method == "POST" and 'sub' in request.form:

        
        # Grab input values from form and create a chat gpt API response
        gpt3 = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Give me a job description of a person with {request.form['year']} experiance in {request.form['skill']}"}]
        )
        
        session['output_content'] = gpt3['choices'][0]['message']['content']
        # session['output_content'] = 'lorem ipsum'
        
    return render_template('main.html')

# Sends the output to the webpage
@app.route('/output')
def output():
    message = {'content' : session.get('output_content')}
    return jsonify(message)


# Updates resetable to true
@app.route('/resetable_update_true')
def resetable_update_true():
    session['resetable'] = True
    return ""


# Updates resetable to false
@app.route('/resetable_update_false')
def resetable_update_false():
    session['resetable'] = False
    return ""


# Gets value for resetable
@app.route("/get_resetable")
def get_resetable():
    return f"{session.get('resetable')}"
