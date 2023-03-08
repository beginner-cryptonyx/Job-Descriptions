import openai
openai.api_key = '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'
completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "user", "content": "Give me a job description of a person with {request.form['year']} experiance in {request.form['skill']}, if any salary is associated, convert it into INR."}])

message = completion['choices'][0]['message']['content']

print(message)
