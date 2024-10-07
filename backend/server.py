from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)

# Allow CORS for all routes
CORS(app)

model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("prompt")
    inputs = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")
    chat_history = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(chat_history[:, inputs.shape[-1]:][0], skip_special_tokens=True)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)