from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = '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'
resetable:bool = False

@app.route("/", methods=['GET', 'POST'])
def main():
    global btn_clicked, output_content
    btn_clicked = 'no'
    if request.method == "POST" and 'sub' in request.form:

        gpt3 = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Give me a job description of a person with {request.form['year']} experiance in {request.form['skill']}"}]
        )
        
        output_content = gpt3['choices'][0]['message']['content']
        # output_content = 'lorem ipsum'
        
    return render_template('main.html')



@app.route('/output')
def output():
    message = {'content' : output_content}
    return jsonify(message)

@app.route('/resetable_update_true')
def resetable_update_true():
    global resetable
    resetable = True
    return ""
   
@app.route('/resetable_update_false')
def resetable_update_false():
    global resetable
    resetable = False
    return ""

@app.route("/get_resetable")
def get_resetable():
    global resetable
    return f"{resetable}"